function mapParams (paramKeys, params) {
  return paramKeys.reduce((acc, key) => {
    return Object.assign({}, acc, { [key]: params[key] })
  }, {})
}