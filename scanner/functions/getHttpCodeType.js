function getHttpCodeType (httpCode) {
  let codeType
  if (_.isNumber(httpCode) && httpCode > 99 && httpCode < 1000) {
    const type = _.floor(httpCode / 100)
    switch (type) {
      case 2:
        codeType = 'http_code_2xx_count'
        break
      case 3:
        codeType = 'http_code_3xx_count'
        break
      case 4:
        codeType = 'http_code_4xx_count'
        break
      case 5:
        codeType = 'http_code_5xx_count'
        break
      default:
        codeType = 'http_code_other_count'
    }
  }
  return codeType
}