const fs = require("fs");
const { execSync } = require("child_process");
const { resultFilePath, resultSavePath } = require("../../config").config;
const { getObj } = require("../util/util");

// 按行读取
const readResultFile = () =>
  new Promise(function(resolve, reject) {
    fs.open(resultFilePath, "r+", function(err, fd) {
      if (err) {
        reject(err);
      }
      let fileData = "";
      const buf = new Buffer.alloc(1024);
      let position = 0;
      let readed = 1024;
      while (readed >= 1024) {
        readed = fs.readSync(fd, buf, 0, 1024, position);
        fileData += buf.toString("utf8", 0, readed);
        position += readed;
      }
      resolve(fileData.split("\n"));
    });
  });

// 分离出时间
const getTimes = lines => {
  const times = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].indexOf(" time:") !== -1) {
      times.push(lines[i].split(" ")[13]);
    }
  }
  return times;
};

// 给时间加上属性
const handleTimes = (
  res,
  times,
  { repnum, limitvar, bdvar, objsize, filePath, scheduler, congestion },
  name
) => {
  const limitvars = limitvar.split(",");
  const bdvars = bdvar.split(",");
  const objsizes = objsize.split(",");
  let counter = 0;
  const handled = [];
  let sumTime = 0;
  // 计算平均时间
  for (let i = 1; i <= times.length; i++) {
    sumTime += Number(times[i - 1]);
    if (i % Number(repnum) === 0) {
      handled.push({ averageTime: sumTime / Number(repnum) });
      sumTime = 0;
    }
  }
  for (let obj in objsizes) {
    for (let bd in bdvars) {
      for (let li in limitvars) {
        handled[counter++] = {
          ...handled[counter - 1],
          limitvar: limitvars[li],
          bdvar: bdvars[bd],
          objsize: objsizes[obj]
        };
      }
    }
  }
  const resObj = {
    name,
    scheduler,
    congestion,
    result: handled,
    resultPath: filePath
  };
  fs.writeFileSync(`${filePath}.json`, JSON.stringify(resObj));
  res.json(getObj(resObj));
};

exports.result = function(
  { repnum, limitvar, bdvar, objsize, name, scheduler, congestion },
  res
) {
  // 将结果复制到保存文件里
  const saveName = `${name}-${new Date().getTime()}`;
  const fileSavePath = `${resultSavePath}${saveName}`;
  fs.copyFile(resultFilePath, `${fileSavePath}.txt`, err => {
    if (err) {
      res.json(err.toString());
    }
  });
  const timesWrapper = times => {
    handleTimes(
      res,
      times,
      {
        repnum,
        limitvar,
        bdvar,
        objsize,
        filePath: fileSavePath,
        scheduler,
        congestion
      },
      saveName
    );
  };
  readResultFile()
    .then(getTimes)
    .then(timesWrapper);
};

exports.clearResult = () => {
  /* 清空结果文件 */
  try {
    const res = execSync(`echo > ${resultFilePath}`);
    return res;
  } catch (error) {
    return error.toString();
  }
};
