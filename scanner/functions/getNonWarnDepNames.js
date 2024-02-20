function getNonWarnDepNames (deps) {
  return Object.keys(deps).reduce(function (names, name) {
    if (!deps[name].warn) {
      names.push(name)
    }
    return names
  }, [])
}