const fs = require("fs");

const parseResult = function() {
  const filePath =
    "/home/yiyi/gd/backend/result/topo1-buffersize-blest-1004.txt";
  const readResultFile = new Promise(function(resolve, reject) {
    fs.open(filePath, "r+", function(err, fd) {
      if (err) {
        reject(err);
      }
      let fileData = "";
      const buf = new Buffer.alloc(1024);
      let position = 0;
      let readed = 1024;
      while (readed >= 1024) {
        readed = fs.readSync(fd, buf, 0, 1024, position);
        fileData += buf.toString("utf8", 0, readed);
        position += readed;
      }
      resolve(fileData.split("\n"));
    });
  });

  const parseResultData = function(lines) {
    const times = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].indexOf(" time:") !== -1) {
        times.push(lines[i]);
      }
    }
  };

  readResultFile.then(parseResultData);
};

parseResult();
