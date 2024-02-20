function lockTree (pkg, pkgLock, opts) {
  const tree = makeNode(pkg.name, null, pkg)
  const allDeps = new Map()
  Array.from(
    new Set(Object.keys(pkg.devDependencies || {})
    .concat(Object.keys(pkg.optionalDependencies || {}))
    .concat(Object.keys(pkg.dependencies || {})))
  ).forEach(name => {
    let dep = allDeps.get(name)
    if (!dep) {
      const depNode = (pkgLock.dependencies || {})[name]
      dep = makeNode(name, name, depNode)
    }
    addChild(dep, tree, allDeps, pkgLock)
  })
  return tree
}