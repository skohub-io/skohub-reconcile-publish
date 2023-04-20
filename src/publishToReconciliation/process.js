import { collectData, sendData, deleteData } from "./handleData.js";
import { writeLog } from "./writeLog.js";
import { config } from "../config.js";

const esIndex = config.es_index;

export const process = async (filePath, log) => {
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
        );
      }
      console.log(
        `> ${v.account}/${v.dataset}: Successfully deleted ${responseDeleted.deleted} documents from ES index.`
      );
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
        log.reconcile_service_url = config.reconcile_service_url;
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
};
