import { writeLog } from "./writeLog.js";
import { process } from "./process.js";

export const publishToReconciliation = (filePath, id, language) => {
  const log = {
    id: id,
    status: "processing",
    log: [],
  };
  writeLog(log);
  return new Promise((resolve, reject) => {
    try {
      resolve(process(filePath, log, language));
    } catch (error) {
      console.log("rejected");
      reject(error);
    }
  });
}
