import { config } from "../config.js";

function NoIndexError(message) {
  this.name = "NoIndexError";
  this.message = message;
  this.stack = new Error().stack;
}

const recIndex = config.es_index;

export async function checkElastic(client) {
  try {
    await client.ping();
  } catch (error) {
    console.error(
      "elasticsearch server not found. Please make sure elastic is running. Stopping..."
    );
    process.exit(1);
  }

  try {
    console.log(`check for index '${recIndex}' ...`);
    if (await client.indices.exists({ index: recIndex })) {
      console.log(`index '${recIndex}' found.`);
    } else {
      throw new NoIndexError(`index '${recIndex}' does not exist. Please create index first. Stopping...`);
    }
    console.log(`index '${recIndex}' ready.`);
  } catch (error) {
    if (error instanceof NoIndexError) {
      console.log(`${error.message}`);
      process.exit(1);
    }
  }
}
