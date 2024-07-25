const fs = require('fs')

const writeLog = (msg) => {
  fs.appendFile('log.txt', msg + "\n", (err) => {
    if (err) {
      console.error('Error writing to file:', err, msg);
    } else {
      // console.log('Message appended to file!', msg);
    }
  });

}

module.exports = {
  writeLog
}