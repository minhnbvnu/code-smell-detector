function mergeConfig(a, b) {
  var config = fu.merge({}, a)
  Object.keys(b).forEach(function (key) {
    if (key == 'predef') {
      config.predef = fu.concat(config.predef || [], b.predef)
    } else {
      config[key] = b[key]
    }
  })
  return config
}