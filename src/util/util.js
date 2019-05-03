const { exec, execSync } = require("child_process");

function getResponseMsg(error, data) {
  return JSON.stringify({ error, data });
}

// const pingAddrs = [
//   "192.168.1.45",
//   "192.168.1.15",
//   "192.168.3.25",
//   "192.168.2.45",
//   "192.168.2.15",
//   "192.168.3.15",
//   "192.168.3.55"
// ];
const pingAddrs = [
  "baidu.com",
  "1.1.1.1",
  "127.0.0.1",
  "zhoujielunabcdefg.com"
];

exports.getResponseMsg = getResponseMsg;

exports.ping = function(socket, id) {
  console.log("start ping...");
  let counter = 0;
  const failedPings = [];
  for (let i = 0; i < pingAddrs.length; i++) {
    exec(`ping ${pingAddrs[i]} -c 10`, function(error, stdout, stderr) {
      counter++;
      if (error) {
        socket.send(
          getResponseMsg(-1, {
            message: `[!！重要]:服务器内部错误：${error.toString()}`,
            id
          })
        );
      }
      if (stderr) {
        socket.send(getResponseMsg(-1, { message: stderr, id }));
      }
      if (error || stderr) {
        failedPings.push(pingAddrs[i]);
      }
      socket.send(getResponseMsg(0, { message: stdout, id }));
      if (pingAddrs.length === counter) {
        socket.send(
          getResponseMsg(1, {
            message: `已完成。${
              failedPings.length === 0
                ? "地址全部ping通。"
                : `${
                    failedPings.length
                  }个地址ping失败。失败地址：${failedPings.join(",")}`
            }`,
            id
          })
        );
        console.log("ping finished.");
      }
    });
  }
};

exports.config = function(scheduler, congestion) {
  try {
    const res = execSync(
      `sysctl -w net.mptcp.mptcp_scheduler=${scheduler}`
    ).toString();

    if (congestion) {
      res += execSync(
        `sysctl -w net.ipv4.tcp_congestion_control=${congestion}`
      ).toString();
    }
    return res;
  } catch (error) {
    return error.toString();
  }
};

exports.getObj = function(data) {
  return { errCode: 0, data };
};

const initScriptPath = "/home/draw/";
const fileName = "teststart.sh";
exports.init = function() {
  try {
    return execSync(`sh ${initScriptPath}${fileName}`).toString();
  } catch (error) {
    return error.toString();
  }
};
