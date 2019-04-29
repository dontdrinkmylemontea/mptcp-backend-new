const { exec } = require("child_process");

// const pingAddrs = [
//   "192.168.1.45",
//   "192.168.1.15",
//   "192.168.3.25",
//   "192.168.2.45",
//   "192.168.2.15",
//   "192.168.3.15",
//   "192.168.3.55"
// ];
const pingAddrs = ["baidu.com", "1.1.1.1", "127.0.0.1"];

exports.ping = function(pingState) {
  console.log("start ping...");
  for (let i = 0; i < pingAddrs.length; i++) {
    exec(`ping ${pingAddrs[i]} -c 10`, function(error, stdout, stderr) {
      if (error) throw error;
      if (stderr) {
        pingState.hasError = true;
        pingState.state.push(shellRes.stderr);
      }
      pingState.state.push(stdout);
    });
  }
};
