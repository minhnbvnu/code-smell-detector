function behavior (code = '', name = '', url = '') {
  debugLogger('发送用户点击行为埋点, 上报内容 => ', { code, name, url })
  log.product(10002, {
    code,
    name,
    url
  })
}