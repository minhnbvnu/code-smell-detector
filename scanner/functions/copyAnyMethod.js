function copyAnyMethod (api) {
  Object.values(api.paths).forEach(path => {
    const anyPath = path['x-amazon-apigateway-any-method']
    if (anyPath != null) {
      delete path['x-amazon-apigateway-any-method']
      if (!('get' in path)) path.get = anyPath
      if (!('post' in path)) path.post = anyPath
      if (!('put' in path)) path.put = anyPath
      if (!('delete' in path)) path.delete = anyPath
      if (!('patch' in path)) path.patch = anyPath
      if (!('head' in path)) path.head = anyPath
      if (!('options' in path)) path.options = anyPath
    }
  })
}