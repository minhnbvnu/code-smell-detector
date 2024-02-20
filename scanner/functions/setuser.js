function setuser (data) {
  let { cookieString, source } = data
  window.localStorage.setItem('cookieString', cookieString)
  window.localStorage.setItem('source', source)
}