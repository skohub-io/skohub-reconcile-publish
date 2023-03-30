import fs from 'fs'
import path from 'path'
import { URL } from 'url'
import config from './config.js'
import esConnect from './esConnect.js'

const __dirname = new URL('.', import.meta.url).pathname

const esClient = esConnect.esClient
const index = config.es_index
const schema = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'schema/esSchema.json')))


async function createIndex (name) {
  console.log(`- (re)creating index '${name}' ...`)
  return esClient.indices.create({ index: name, body: schema })
};

async function resetIndex (writeSampleData) {
  if (await esClient.indices.exists({ index: index })) {
    await esClient.indices.delete({ index: index })
  }
  await createIndex(index)
  console.log(`    index '${index}' has been reset.`)
};

resetIndex("skohub-reconcile")

export { createIndex, resetIndex }
