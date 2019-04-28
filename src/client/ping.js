const shell = require("shelljs");

const pingAddrs = [
  "192.168.1.45",
  "192.168.1.15",
  "192.168.3.25",
  "192.168.2.45",
  "192.168.2.15",
  "192.168.3.15",
  "192.168.3.55"
];

exports.ping = function(pingState) {
  for (let i = 0; i < pingAddrs.length; i++) {
    const shellRes = shell.exec(`ping ${pingAddrs[i]}`);
    if (shellRes.stderr) {
      pingState.hasError = true;
      pingState.state.push(shellRes.stderr);
      return;
    }
    pingState.state.push(shellRes.stdout);
  }
};
