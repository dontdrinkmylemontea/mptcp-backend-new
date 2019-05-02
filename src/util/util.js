const { exec, execSync } = require("child_process");

function getResponseMsg(error, data) {
  return JSON.stringify({ error, data });
}

exports.getObj = function(errorCode, message) {
  return {
    errorCode,
    message
  };
};

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

exports.ping = function(socket, id) {
  console.log("start ping...");
  let counter = 0;
  for (let i = 0; i < pingAddrs.length; i++) {
    exec(`ping ${pingAddrs[i]} -c 10`, function(error, stdout, stderr) {
      counter++;
      if (error) throw error;
      if (stderr) {
        socket.send(getResponseMsg(-1, { message: stderr, id }));
      }
      socket.send(getResponseMsg(0, stdout));
      if (pingAddrs.length === counter) {
        socket.send(getResponseMsg(1, { message: "已完成。", id }));
        console.log("ping finished.");
      }
    });
  }
};

exports.config = function(scheduler, congestion) {
  const res = execSync(
    `sysctl -w net.mptcp.mptcp_scheduler=${scheduler}`
  ).toString();
  if (congestion) {
    res += execSync(
      `sysctl -w net.ipv4.tcp_congestion_control=${congestion}`
    ).toString();
  }
  return res;
};

exports.getObj = function(data) {
  return { errCode: 0, data };
};
