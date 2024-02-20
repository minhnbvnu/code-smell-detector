function getuser () {
  var cookie = window.localStorage.getItem('cookieString')
  var source = window.localStorage.getItem('source')
  if (cookie && source) {
    return new UserInfo(cookie, source)
  } else {
    return null
  }
}