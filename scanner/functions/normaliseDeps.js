function normaliseDeps (deps) {
  if (Array.isArray(deps)) {
    deps = deps.reduce(function (d, depName) {
      d[depName] = '*'
      return d
    }, {})
  }
  return deps
}