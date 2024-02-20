async function checkjsErrorResult(options) {
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
  let r1 = await JsModel.find(matchCond).countDocuments();
  let r2 = await PvModel.find(matchCond).countDocuments();
  let rate1 = isNaN(r1 / r2) ? 0 : r1 / r2;
  return rate1;
}