import crypto from "crypto";
import esb from "elastic-builder";
import fs from "fs";
import path from "path";
import { buildJSON } from "./buildJSON.js";
import { esClient } from "../elastic/connect.js";
import { writeLog } from "./writeLog.js";
import { config } from "../config.js";

const esIndex = config.es_index;

const hashID = (id) => {
  const hash = crypto.createHash("sha256");
  hash.update(id);
  return hash.digest("hex");
};

export const collectData = async (filePath, log) => {
  var data = [];
  const account = path.basename(path.dirname(filePath));
  console.log(`> Read and parse ${account}/${path.basename(filePath)} ...`);
  if (!/[a-zA-Z0-9]/.test(account.slice(0, 1))) {
    console.log(
      `> Invalid data: account must start with a letter or a number. Instead, its value is: ${account}`
    );
  }
  const ttlString = await fs.readFileSync(filePath).toString();
  const j = await buildJSON(ttlString.toString(), account);
  if (!/[a-zA-Z0-9]/.test(j.dataset.slice(0, 1))) {
    console.log(
      `> Invalid data: dataset must start with a letter or a number. Instead, its value is: ${j.dataset}`
    );
  }
  log.status = "processing";
  log.account = account;
  log.dataset = j.dataset;
  writeLog(log);
  data.push({ account: j.account, dataset: j.dataset, entries: j.entries });
  return data;
};

export const deleteData = async (account, dataset) => {
  console.log(
    `Delete data for account: ${account} and dataset: ${dataset} ...`
  );
  const requestBody = esb
    .requestBodySearch()
    .query(
      esb
        .boolQuery()
        .must([
          ...(dataset && [esb.termQuery("dataset", dataset)]),
          ...(account && [esb.termQuery("account", account)]),
        ])
    );
  return esClient.deleteByQuery({
    index: esIndex,
    refresh: true,
    body: requestBody.toJSON(),
  });
};

export const sendData = async (entries) => {
  const operations = entries.flatMap((doc) => [
    {
      index: {
        _index: "skohub-reconcile",
        _id: hashID(doc.id + doc.dataset + doc.account),
      },
    },
    { ...doc },
  ]);
  const bulkResponse = await esClient.bulk({
    refresh: true,
    operations,
  });

  if (bulkResponse.errors) {
    const erroredDocuments = [];
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0];
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: operations[i * 2],
          document: operations[i * 2 + 1],
        });
      }
    });
    console.log(erroredDocuments);
  }

  return bulkResponse;
};
