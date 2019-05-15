const produce = {
  pingAddrs: ["baidu.com", "1.1.1.1", "127.0.0.1", "zhoujielunabcdefg.com"],
  startScriptPath: "/home/yiyi/gd/backend/script/start.sh",
  resultFilePath: "/home/yiyi/gd/backend/log/kern.log",
  testScriptPath: "/home/yiyi/gd/backend/script/test.rb",
  resultSavePath: "/home/yiyi/gd/backend/result/",
  raplPath: "/home/yiyi/gd/backend/script/rapl.sh",
  produce: true
};

const build = {
  pingAddrs: [
    "192.168.1.45",
    "192.168.1.15",
    "192.168.3.25",
    "192.168.2.45",
    "192.168.2.15",
    "192.168.3.15",
    "192.168.3.55"
  ],
  startScriptPath: "/home/draw/teststart.sh",
  resultFilePath: "/var/log/kern.log",
  testScriptPath: "/home/xjy/topo/test.rb",
  resultSavePath: "/home/draw/auto-control/backend/result/",
  raplPath: "/"
};

const env = process.argv[2] === "build";
exports.config = env ? build : produce;
