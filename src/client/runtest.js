const { spawn, execSync } = require("child_process");
const { getResponseMsg } = require("../util/util");
const { testScriptPath, resultFilePath } = require("../../config");

exports.runtest = function(sockets, id, content) {
  /* 清空结果文件 */
  try {
    const res = execSync(`echo > ${resultFilePath}`);
    sockets.send(getResponseMsg(0, { message: res, id }));
  } catch (error) {
    sockets.send(getResponseMsg(-1, { message: error.toString(), id }));
  }
  /* 执行脚本 */
  const args = [];
  args.push(testScriptPath);
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
