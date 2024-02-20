function forceCheckNum (rule, value, callback) {
  const reg = /^\d+$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(localStorage.getItem('preferredLanguage') === 'en' ? 'figures only' : '必须是数字')
  }
}