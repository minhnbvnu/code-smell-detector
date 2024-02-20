function parseDuration (duration) {
  const timeMap = {
    秒: 1,
    分: 60,
    小时: 60 * 60
  }

  // 去掉多余的空格并将单位转化为小写字母
  duration = duration.trim().toLowerCase()

  // 去掉末尾的 "钟" 字符
  if (duration.endsWith('钟')) {
    duration = duration.slice(0, -1)
  }

  // 提取数字和单位
  const match = duration.match(/^(\d+)\s*([\u4e00-\u9fa5]+)$/)

  if (!match) {
    throw new Error('Invalid duration string: ' + duration)
  }

  const num = parseInt(match[1], 10)
  const unit = match[2]

  if (!(unit in timeMap)) {
    throw new Error('Unknown time unit: ' + unit)
  }

  return num * timeMap[unit]
}