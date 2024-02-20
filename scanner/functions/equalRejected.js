function equalRejected(t, df, confi) {
  if (confi <= 0 || confi >= 100) {
    throw Error("Confidence level must be in (0, 100)");
  }
  if (df <= 30) {
    var thresholds = quantiles[df];
  } else if (df <= 130) {
    var thresholds = quantiles[Math.floor(df / 10) * 10];
  } else {
    var thresholds = quantiles.inf;
  }
  var quantile = thresholds[quantiles.lvl.indexOf(confi)];
  return Math.abs(t) > quantile;
}