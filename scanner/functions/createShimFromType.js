function createShimFromType({ type, agent, moduleName, resolvedName, shimName, pkgVersion }) {
  let shim = null
  if (properties.hasOwn(SHIM_TYPE_MAP, type)) {
    const ShimClass = SHIM_TYPE_MAP[type]
    shim = new ShimClass(agent, moduleName, resolvedName, shimName, pkgVersion)
  } else {
    shim = new Shim(agent, moduleName, resolvedName, shimName, pkgVersion)
  }
  return shim
}