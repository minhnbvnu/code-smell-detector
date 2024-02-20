function encWbi (params, imgKey, subKey) {
  const mixinKey = getMixinKey(imgKey + subKey)
  const currTime = Math.round(Date.now() / 1000)
  const chrFilter = /[!'()*]/g
  let query = []
  Object.assign(params, { wts: currTime }) // 添加 wts 字段
  // 按照 key 重排参数
  Object.keys(params).sort().forEach((key) => {
    query.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(
            // 过滤 value 中的 "!'()*" 字符
            params[key].toString().replace(chrFilter, '')
        )}`
    )
  })
  query = query.join('&')
  const wbiSign = md5(query + mixinKey) // 计算 w_rid
  return query + '&w_rid=' + wbiSign
}