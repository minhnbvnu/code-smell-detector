function completeJSON (input) {
  let result = {}

  let inJson = false
  let inQuote = false
  let onStructure = false
  let isKey = true
  let tempKey = ''
  let tempValue = ''
  for (let i = 0; i < input.length; i++) {
    // 获取当前字符
    let char = input[i]
    // 获取到json头
    if (!inJson && char === '{') {
      inJson = true
      continue
    }
    // 如果不再json中，忽略当前字符
    if (!inJson) continue

    // 获取结构引号
    if (char === '"' && input[i - 1] != '\\') {
      inQuote = !inQuote
      // 如果是开始数据，则确保当前结构开放
      if (inQuote) onStructure = true
      continue
    }
    // 获取:切换kv
    if (!inQuote && onStructure && char === ':') {
      isKey = !isKey
      continue
    }
    // 将字符写入缓存
    if (inQuote && onStructure) {
      // 根据当前类型写入对应缓存
      if (isKey) {
        tempKey += char
      } else {
        tempValue += char
      }
    }
    // 结束结构追加数据
    if (!inQuote && onStructure && char === ',') {
      // 追加结构
      result[tempKey] = tempValue.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t')
      // 结束结构清除数据
      onStructure = false
      inQuote = false
      isKey = true
      tempKey = ''
      tempValue = ''
    }
  }
  // 处理截断的json数据
  if (onStructure && tempKey != '') {
    result[tempKey] = tempValue.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t')
  }
  return result
}