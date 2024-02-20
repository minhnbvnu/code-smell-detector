function _config () {
  return {
    headers: {
      'Referer': 'http://y.qq.com/portal/player.html',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
      'Cookie': `${(getuser()).cookieString}`
    }
  }
}