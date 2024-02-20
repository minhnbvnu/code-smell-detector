function urlappend (url, s) {
    return url + (/\?/.test(url) ? '&' : '?') + s
  }