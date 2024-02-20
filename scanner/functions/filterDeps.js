function filterDeps (deps) {
  if (!filterList.length) return deps

  return Object.keys(deps).reduce(function (filteredDeps, name) {
    if (filterList.indexOf(name) !== -1) {
      filteredDeps[name] = deps[name]
    }
    return filteredDeps
  }, {})
}