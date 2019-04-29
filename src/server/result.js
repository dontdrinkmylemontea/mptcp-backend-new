const fs = require("fs");

const filePath = "/home/yiyi/gd/backend/script/test.rb";

exports.result = function(req, res) {
  fs.readFile(filePath, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
};
