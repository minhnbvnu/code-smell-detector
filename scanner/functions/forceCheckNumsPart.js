function forceCheckNumsPart (rule, value, callback) {
  const reg = /^[0-9]*$/
  if (reg.test(value) || value === -1) {
    callback()
  } else {
    callback(localStorage.getItem('preferredLanguage') === 'en' ? 'Not less than -1' : '不小于-1')
  }
}