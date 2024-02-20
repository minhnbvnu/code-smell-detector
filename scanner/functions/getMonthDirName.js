function getMonthDirName (logAt) {
  let startAtMoment = moment.unix(logAt)
  let monthDirName = `month_${startAtMoment.format(YMFormat)}`
  return monthDirName
}