function noPrivilege (msg = '没有权限') {
  return showResult({}, msg, 10000, ACTION_TYPE_FORBIDDEN, '')
}