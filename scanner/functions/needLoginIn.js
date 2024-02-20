function needLoginIn (msg = '请先登录') {
  return showResult({}, msg, 10000, ACTION_TYPE_LOGIN, '/login')
}