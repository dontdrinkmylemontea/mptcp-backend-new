const fs = require("fs");
const { getObj } = require("../util/util");

const filePath = "/home/yiyi/gd/backend/result/topo1-buffersize-blest-1004.txt";

exports.result = function(req, res) {
  const buf = new Buffer.alloc(1024);
  const begin = 0;
  fs.open(filePath, "r+", function(err, fd) {
    if (err) throw err;
    let readed = 1;
    while (readed > 0) {
      fs.read(fd, buf, begin, 1024, 0, function(error, bytes) {
        if (error) throw error;
        res.send(getObj(buf.toString()));
        readed = bytes;
      });
    }
  });
};
