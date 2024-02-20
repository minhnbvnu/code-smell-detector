function registerRouterByMethod (customerRouter, routerConfig, url) {
  switch (routerConfig.methodType) {
    case RouterConfigBuilder.METHOD_TYPE_GET:
      customerRouter.get(url, (req, res) => {
        return routerConfig.func(req, res)
      })
      break
    case RouterConfigBuilder.METHOD_TYPE_POST:
      customerRouter.post(url, (req, res) => {
        return routerConfig.func(req, res)
      })
      break
    default:
  }
}