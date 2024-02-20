function computePercent (dividend, divisor, showAsPercent = true) {
  let RETURN_ERROR
  if (showAsPercent) {
    // 百分比模式下返回 '-'
    RETURN_ERROR = '-'
  } else {
    // 小数模式下返回 0
    RETURN_ERROR = 0
  }

  dividend = parseFloat(dividend)
  divisor = parseFloat(divisor)

  if (dividend <= 0 || divisor <= 0) {
    // 不能出现0或负值
    return RETURN_ERROR
  }

  if (_.isFinite(dividend) === false || _.isFinite(divisor) === false) {
    // 不能是非数字
    return RETURN_ERROR
  }

  let result = RETURN_ERROR
  let resultInt = parseInt(dividend / divisor * 10000)

  if (showAsPercent) {
    result = (resultInt / 100) + '%'
  } else {
    result = resultInt / 10000
  }
  return result
}