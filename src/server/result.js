const fs = require("fs");

const filePath = "/home/yiyi/gd/backend/result/topo1-buffersize-blest-1004.txt";

exports.result = function(req, res) {
  const buf = new Buffer.alloc(1024);
  const begin = 0;
  fs.open(filePath, "r+", function(err, fd) {
    if (err) throw err;
    let readed = 0;
    while (readed > 0) {
      fs.read(fd, buf, begin, 1024, 0, function(error, bytes) {
        if (error) throw error;
        res.send(buf.toString());
        readed = bytes;
      });
    }
  });

  fs.readFile(filePath, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
};
