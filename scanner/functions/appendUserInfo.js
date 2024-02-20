function appendUserInfo (req, res, next) {
  let cookies = req.cookies
  let token = _.get(cookies, ['fee_token'], '')
  let user = Auth.parseToken(token)
  // 将用户信息添加到req.fee中(只添加信息, 在check里在检查是否需要登录)
  _.set(req, ['fee', 'user'], user)
  next()
}