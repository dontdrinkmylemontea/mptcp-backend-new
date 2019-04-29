const { spawn } = require("child_process");

// const SCRIPT_PATH = "../script/mptcp_benchmark_test.rb";
const SCRIPT_PATH = "/home/yiyi/gd/backend/script/";
const SCRIPT_NAME = "test.rb";

exports.runtest = function(testStatus, content) {
  const args = [];
  args.push(`${SCRIPT_PATH}${SCRIPT_NAME}`);
  for (const item in content) {
    args.push(` --${item}=${content[item]}`);
  }
  const rubytest = spawn("ruby", args);
  rubytest.stdout.on("data", data => {
    testStatus.state.push(data.toString());
  });

  rubytest.stderr.on("data", data => {
    testStatus.hasError = true;
    testStatus.state.push(data.toString());
  });

  rubytest.on("close", code => {
    testStatus.finished = true;
    testStatus.state.push(`${code}运行结束`);
  });

  rubytest.on("error", err => {
    testStatus.hasError = true;
    testStatus.state.push(err);
  });
};
