async function checkPerfSpeedResult(options) {
  let appKey = new Mongoose.Types.ObjectId(options.appKey);
  let sTime = new Date(
    new Date().setMinutes(new Date().getMinutes() - options.times)
  );
  let eTime = new Date();
  let matchCond = {
    createTime: {
      $gte: sTime,
      $lte: eTime,
    },
    appKey: appKey,
  };
  // 查询当前阶段加载速度平均值
  let r1 = await PerfModel.find(matchCond);
  let r1Avg = r1.reduce((acc, val) => acc + val.load, 0) / r1.length;
  return r1Avg;
}