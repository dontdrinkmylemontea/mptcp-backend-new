const { execSync } = require("child_process");

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
