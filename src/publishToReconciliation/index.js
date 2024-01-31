import { writeLog } from "./writeLog.js";
import { processFile } from "./processFile.js";
import { ReconcileData } from "../types.js";

/**
  * @param {ReconcileData} reconcileData
  */
export const publishToReconciliation = (reconcileData) => {
  const log = {
    id: reconcileData.id,
    status: "processing",
    log: [],
  };
  writeLog(log);
  return new Promise((resolve, reject) => {
    try {
      resolve(processFile(reconcileData, log));
    } catch (error) {
      console.log("rejected");
      reject(error);
    }
  });
}
