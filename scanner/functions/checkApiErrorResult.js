async function checkApiErrorResult(options) {
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
  // 查询当前阶段错误率
  let r1 = await ApiModel.find(
    _.assign({ success: false }, matchCond)
  ).countDocuments();
  let r2 = await ApiModel.find(matchCond).countDocuments();
  let rate1 = isNaN(r1 / r2) ? 0 : r1 / r2;
  return rate1;
}