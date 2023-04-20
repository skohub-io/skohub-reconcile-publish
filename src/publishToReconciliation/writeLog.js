import fs from 'fs';

export const writeLog = (log) => {
  // if public/log does not exist, create it
  if (!fs.existsSync('public/log')) {
    fs.mkdirSync('public/log');
  }
  fs.writeFileSync(`public/log/${log.id}.json`, JSON.stringify(log));
}
