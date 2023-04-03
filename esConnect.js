import elasticsearch from "@elastic/elasticsearch";

const esClient = new elasticsearch.Client({
  node: `http://localhost:9200`,
});

export default { esClient };
