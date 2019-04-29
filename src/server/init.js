const { execSync } = require("child_process");

const initScriptPath = "/home/dawn";

const fileName = "teststart.sh";

exports.init = function() {
  return execSync(`cd sudo sh ${initScriptPath} && sh ${fileName}`).toString();
};
