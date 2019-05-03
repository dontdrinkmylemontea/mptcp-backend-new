const { spawn } = require("child_process");
const { getResponseMsg } = require("../util/util");

// const SCRIPT_PATH = "../script/mptcp_benchmark_test.rb";
const SCRIPT_PATH = "/home/yiyi/gd/backend/script/";
const SCRIPT_NAME = "test.rb";
// const SCRIPT_PATH = "/home/xjy/topo";
// const SCRIPT_NAME = "test.rb";

exports.runtest = function(sockets, id, content) {
  const args = [];
  args.push(`${SCRIPT_PATH}${SCRIPT_NAME}`);
  for (const item in content) {
    args.push(` --${item}=${content[item]}`);
  }
  const rubytest = spawn("ruby", args);
  rubytest.stdout.on("data", data => {
    sockets.send(getResponseMsg(0, { message: data.toString(), id }));
  });

  rubytest.stderr.on("data", data => {
    sockets.send(getResponseMsg(-1, { message: data.toString(), id }));
  });

  rubytest.on("close", () => {
    sockets.send(getResponseMsg(1, { message: "测试结束。", id }));
  });

  rubytest.on("error", err => {
    sockets.send(getResponseMsg(-1, { message: err.toString(), id }));
  });
};
