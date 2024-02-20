function proxyOptions(config) {
  let proxyUrl
  if (config.proxy) {
    proxyUrl = config.proxy
  } else {
    proxyUrl = 'https://'
    let proxyAuth = config.proxy_user
    if (config.proxy_pass !== '') {
      proxyAuth += ':' + config.proxy_pass
      proxyUrl += `${proxyAuth}@`
    }

    proxyUrl += `${config.proxy_host || 'localhost'}:${config.proxy_port || 80}`
  }

  return proxyUrl
}