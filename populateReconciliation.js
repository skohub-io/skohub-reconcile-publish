// .env data
// ES_PROTO=http
// ES_HOST=127.0.0.1
// ES_PORT=9200
// ES_USERNAME=skohub
// ES_PASSWORD=skohub
// ES_INDEX=skohub-reconcile

const fs = require("fs");
const path = require("path");
const { globSync } = require("glob");
const ttl2jsonld = require("@frogcat/ttl2jsonld").parse;
const elasticsearch = require("@elastic/elasticsearch");
const esb = require("elastic-builder/src");
const jsonld = require("jsonld");
const context = require("./context");

require("dotenv").config();
const esIndex = process.env.ES_INDEX;

async function collectData() {
  var data = [];
  const files = globSync("data/**/*.ttl");
  for (const f of files) {
    const account = path.dirname(f).split(path.sep)[1];
    console.log(`> Read and parse ${account}/${path.basename(f)} ...`);
    if (!/[a-zA-Z0-9]/.test(account.slice(0, 1))) {
      console.log(
        `> Invalid data: account must start with a letter or a number. Instead, its value is: ${account}`
      );
      continue;
    }
    const ttlString = fs.readFileSync(f).toString();
    const j = await buildJSON(ttlString, account);
    if (!/[a-zA-Z0-9]/.test(j.dataset.slice(0, 1))) {
      console.log(
        `> Invalid data: dataset must start with a letter or a number. Instead, its value is: ${j.dataset}`
      );
      continue;
    }
    data.push({ account: j.account, dataset: j.dataset, entries: j.entries });
  }
  return data;
}

async function buildJSON(ttlString, account) {
  const doc = ttl2jsonld(ttlString);
  const expanded = await jsonld.expand(doc);
  const compacted = await jsonld.compact(expanded, context.jsonld);

  var entries = "";
  var dataset = "";

  compacted["@graph"].forEach((graph, _) => {
    const { ...properties } = graph;
    const type = Array.isArray(properties.type)
      ? properties.type.find((t) => ["Concept", "ConceptScheme"])
      : properties.type;
    const node = {
      ...properties,
      type,
    };
    if (node.type === "ConceptScheme") {
      dataset = node.id.substring(0, node.id.lastIndexOf("/"));
    } else if (node.type === "Concept") {
      // TODO check in scheme OR topConceptOf
      dataset =
        node?.inScheme?.[0]?.id.substring(
          0,
          node.inScheme[0].id.lastIndexOf("/")
        ) ??
        node.topConceptOf[0].id.substring(
          0,
          node.topConceptOf[0].id.lastIndexOf("/")
        );
    }
    node["dataset"] = dataset;
    node["account"] = account;
    node["@context"] = context.jsonld["@context"];

    entries = `${entries}{ "index" : { "_index" : "${esIndex}" } }\n`;
    entries = entries + JSON.stringify(node) + "\n";
  });
  return { account: account, dataset: dataset, entries: entries };
}

var esClient;
if (process.env.ES_USER && process.env.ES_PASS) {
  esClient = new elasticsearch.Client({
    node: `${process.env.ES_PROTO}://${process.env.ES_USER}:${process.env.ES_PASS}@${process.env.ES_HOST}:${process.env.ES_PORT}`,
  });
} else {
  esClient = new elasticsearch.Client({
    node: `${process.env.ES_PROTO}://${process.env.ES_HOST}:${process.env.ES_PORT}`,
  });
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

async function sendData(entries) {
  return esClient.bulk({
    index: esIndex,
    body: entries,
  });
}

async function main() {
  const data = await collectData();
  data.forEach(async (v) => {
    try {
      const response = await deleteData(v.account, v.dataset);
      if (response.failures.length > 0) {
        console.log(
          `> Warning: Delete ${v.account}/${v.dataset} had failures. Better check response:\n`,
          response
        );
      } else {
        console.log(
          `> ${v.account}/${v.dataset}: Successfully deleted ${response.deleted} documents from ES index.`
        );
      }
    } catch (error) {
      console.error(
        `Failed populating ${esIndex} index of ES server when trying to delete ${v.account}/${v.dataset}. Abort!`,
        error
      );
    }

    try {
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
      }
    } catch (error) {
      console.error(
        `Failed populating ${esIndex} index of ES server with ${v.account}/${v.dataset}. Abort!`,
        error
      );
    }
  });
}

main();
