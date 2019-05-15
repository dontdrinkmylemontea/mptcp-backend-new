const { spawn, execSync } = require("child_process");
const { getResponseMsg } = require("../util/util");
const { testScriptPath, raplPath } = require("../../config").config;

exports.runtest = function(sockets, id, content) {
  /* 插入msr模块 */
  try {
    const result = execSync("modprobe msr");
    sockets.send(getResponseMsg(0, { message: result.toString(), id }));
    /* 执行脚本 */
    const args = ["ruby"];
    args.push(testScriptPath);
    for (const item in content) {
      args.push(` --${item}=${content[item]}`);
    }
    const rubytest = spawn(`${raplPath}`, args);
    if(rubytest.stdout){
      rubytest.stdout.on("data", data => {
        sockets.send(getResponseMsg(0, { message: data.toString(), id }));
      });
    }

    if(rubytest.stderr){
      rubytest.stderr.on("data", data => {
        sockets.send(getResponseMsg(-1, { message: data.toString(), id }));
      });
    }

    rubytest.on("close", () => {
      sockets.send(getResponseMsg(1, { message: "测试结束。", id }));
    });

    rubytest.on("error", err => {
      sockets.send(getResponseMsg(-1, { message: err.toString(), id }));
    });
  } catch (error) {
    sockets.send(getResponseMsg(1, { message: error.toString(), id }));
  }
};
