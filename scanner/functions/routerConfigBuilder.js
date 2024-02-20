function routerConfigBuilder (url = '/', methodType = METHOD_TYPE_GET, func, needProjectPriv = true, needLogin = true) {
  let routerConfig = {}
  routerConfig[url] = {
    methodType,
    func: (req, res, next) => {
      // 封装一层, 统一加上catch代码
      return func(req, res, next).catch(e => {
        Logger.error('error.massage =>', e.message, '\nerror.stack =>', e.stack)
        res.status(500).send(API_RES.showError('服务器错误', 10000, e.stack))
      })
    },
    needLogin,
    needProjectPriv
  }
  return routerConfig
}