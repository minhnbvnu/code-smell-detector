function getAlias(path, alias, last) {
  const match = Object.keys(alias).filter(key => {
    const re = cached[key] || (cached[key] = new RegExp(`^${key}$`))
    return re.test(path) && path !== last
  })[0]

  return match ?
    getAlias(path.replace(cached[match], alias[match]), alias, path) :
    path
}