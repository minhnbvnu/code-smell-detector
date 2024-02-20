function ip2Locate (ip) {
  let country = ''
  let province = ''
  let city = ''
  if (isIp(ip) === false) {
    return {
      country, //  国家
      province, //  省
      city //  市
    }
  }
  let res = DatabaseClient.findSync(ip)
  country = _.get(res, [0], '')
  province = _.get(res, [1], '')
  city = _.get(res, [2], '')
  return {
    country, //  国家
    province, //  省
    city //  市
  }
}