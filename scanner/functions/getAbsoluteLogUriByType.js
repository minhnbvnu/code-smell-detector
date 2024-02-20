function getAbsoluteLogUriByType (logAt, logType = LOG_TYPE_RAW) {
  // 确保logType一定是指定类型
  switch (logType) {
    case LOG_TYPE_RAW:
      break
    case LOG_TYPE_JSON:
      break
    case LOG_TYPE_TEST:
      break
    default:
      logType = LOG_TYPE_RAW
  }
  let startAtMoment = moment.unix(logAt)
  let basePath = getAbsoluteBasePathByType(logType)
  let monthDirName = getMonthDirName(logAt)
  let fileName = `./${monthDirName}/day_${startAtMoment.format(DDFormat)}/${startAtMoment.format(HHFormat)}/${startAtMoment.format(mmFormat)}.log`
  let fileUri = path.resolve(basePath, fileName)
  return fileUri
}