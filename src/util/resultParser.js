const fs = require("fs");

const filePath = "/home/yiyi/gd/backend/result/topo1-buffersize-blest-1004.txt";
let fileData = "";

const buf = new Buffer.alloc(1024);
const begin = 0;
// let readed = 0;

const readResultFile = new Promise(function(resolve, reject) {
  fs.open(filePath, "r+", function(err, fd) {
    if (err) {
      reject(err);
    }
    fs.read(fd, buf, begin, 1024, 0, function(error, bytes) {
      if (error) throw error;
      fileData += buf.toString();
      resolve(fileData.split("\n"));
    });
  });
});

const parseResultData = function(lines) {
  for (let i = 0; i < lines.length; i++) {
    console.log(lines[i].split(" "));
  }
};

readResultFile.then(parseResultData);
