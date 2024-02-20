function showResult (data, msg = '', code = 0, action = ACTION_TYPE_SUCCESS, url = '') {
  return {
    code,
    action,
    data,
    msg,
    url
  }
}