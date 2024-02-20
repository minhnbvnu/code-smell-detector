function getAbsoluteBasePathByType (logType = LOG_TYPE_RAW) {
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
  let fileUri = path.resolve(logPath, 'kafka', logType)
  return fileUri
}