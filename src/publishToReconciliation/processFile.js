import { parseFile, sendData, deleteData } from "./handleData.js";
import { writeLog } from "./writeLog.js";
import { config } from "../config.js";

const esIndex = config.es_index;

function HandleDataError(message, error, account, dataset) {
  this.message = message;
  this.error = error;
  this.name = "HandleDataError";
  this.account = account;
  this.dataset = dataset;
}

export const processFile = async (filePath, log, language) => {
  try {
    const data = await parseFile(filePath, log);
    for await (const v of data) {
      // delete old data
      const responseDeleted = await deleteData(v.account, v.dataset);
      if (responseDeleted.failures.length > 0) {
        throw new HandleDataError(
          `Warning: DeleteData ${v.account}/${v.dataset} had failures. Better check response:\n`,
          responseDeleted,
          v.account,
          v.dataset
        );
      }
      console.log(
        `${v.account}/${v.dataset}: Successfully deleted ${responseDeleted.deleted} documents from ES index.`
      );

      // send new data
      const responseSend = await sendData(v.entries);
      if (responseSend.errors) {
        throw new HandleDataError(
          `Warning: SendData ${v.account}/${v.dataset} had failures. Better check response:\n`,
          responseSend,
          v.account,
          v.dataset
        );
      }
      console.log(
        `> ${v.account}/${v.dataset}: Successfully sent ${responseSend.items.length} documents to ES index.`
      );
      // TODO improve this
      log.account = v.account;
      log.dataset = v.dataset;
      log.language = language
      log.status = "success";
      log.reconcile_service_url = config.reconcile_service_url;
      writeLog(log);
    }
  } catch (error) {
    if (error.name === "HandleDataError") {
      console.error(
        `Failed populating ${esIndex} index of ES server with account: ${error.account} and dataset: ${error.dataset}. Abort!`,
        error
      );
      log.account = error.account;
      log.dataset = error.dataset;
      log.error = error.error
      log.status = "failed";
      writeLog(log);
    } else {
      console.error(
        `Failed populating ${esIndex} index of ES server Abort!`, error
      );
      log.status = "failed";
      log.error = error.error || error.message;
      writeLog(log);
    }
    throw error;
  }
  return true;
};
