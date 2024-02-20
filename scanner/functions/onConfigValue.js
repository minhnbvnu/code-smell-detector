function onConfigValue (val) {
  let configVal = ''
  if (val.includes('&')) {
    configVal = val.includes('=') ? val.replace(/\n/g, '&') : val    // key=value&key=value
  } else {
    if (val.includes('=')) {
      // 多行输入 key=value
      const conTempStr = val.trim()
      const numArr = (conTempStr.split('=')).length - 1
      configVal = numArr === 1 ? val : val.replace(/\n/g, ',')
    } else {
      configVal = val
    }
  }
  return configVal
}