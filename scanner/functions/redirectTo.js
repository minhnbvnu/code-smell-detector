function redirectTo (url = '', msg = '', data = {}, errorNo = 10000) {
  let action = ACTION_TYPE_REDIRECT
  return showResult(data, msg, errorNo, action, url)
}