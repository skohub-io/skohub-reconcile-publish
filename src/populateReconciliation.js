import { Client } from "@elastic/elasticsearch";
import crypto from "crypto";
import esb from "elastic-builder";
import fs from "fs";
import path from "path";
import { config } from "./config.js";
import { buildJSON } from "./buildJSON.js";

const esIndex = config.es_index;

const setupEsClient = () => {
  if (config.es_user && config.es_pass) {
    return new Client({
      node: `${config.es_proto}://${config.es_user}:${config.es_pass}@${config.es_host}:${config.es_port}`,
    });
  } else {
    return new Client({
      node: `${config.es_proto}://${config.es_host}:${config.es_port}`,
    });
  }
};

const esClient = setupEsClient();

async function collectData(filePath, log) {
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
}

async function deleteData(account, dataset) {
  const requestBody = esb
    .requestBodySearch()
    .query(
      esb
        .boolQuery()
        .must([
          ...(dataset && [esb.termQuery("dataset.keyword", dataset)]),
          ...(account && [esb.termQuery("account.keyword", account)]),
        ])
    );
  return esClient.deleteByQuery({
    index: esIndex,
    refresh: true,
    body: requestBody.toJSON(),
  });
}

function hashID(id) {
  const hash = crypto.createHash("sha256");
  hash.update(id);
  return hash.digest("hex");
}

async function sendData(entries) {
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
}

function writeLog(log) {
  fs.writeFileSync(`public/log/${log.id}.json`, JSON.stringify(log));
}

async function process(filePath, log) {
  const data = await collectData(filePath, log);
  for await (const v of data) {
    try {
      // delete old data
      const responseDeleted = await deleteData(v.account, v.dataset);
      // if failures occured, log them
      if (responseDeleted.failures.length > 0) {
        console.log(
          `> Warning: DeleteData ${v.account}/${v.dataset} had failures. Better check response:\n`,
          responseDeleted
        )}
      const response = await sendData(v.entries);
      if (response.errors) {
        console.log(
          `> Warning: SendData ${v.account}/${v.dataset} had failures. Better check response:\n`,
          response
        );
      } else {
        console.log(
          `> ${v.account}/${v.dataset}: Successfully sent ${response.items.length} documents to ES index.`
        );
        // TODO improve this
        log.account = v.account;
        log.dataset = v.dataset;
        log.status = "success";
        writeLog(log);
      }
    } catch (error) {
      console.error(
        `Failed populating ${esIndex} index of ES server with account: ${v.account} and dataset: ${v.dataset}. Abort!`,
        error
      );
      throw new Error("did not work");
    }
  }
  return;
}

export const populateReconciliation = (filePath, id) => {
  const log = {
    id: id,
    status: "processing",
    log: [],
  };
  writeLog(log);
  return new Promise((resolve, reject) => {
    try {
      resolve(process(filePath, log));
    } catch (error) {
      console.log("rejected");
      reject(error);
    }
  });
}
