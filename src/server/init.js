const { execSync } = require("child_process");

const initScriptPath = "/home/dawn/";

const fileName = "teststart.sh";

exports.init = function() {
  return execSync(`sh ${initScriptPath}${fileName}`).toString();
};
