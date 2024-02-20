function branchOrU(otherwise, template) {
  const k2o = I.create(null)
  for (const k in template) {
    const v = template[k]
    k2o[k] = I.isObject(v) ? branchOrU(otherwise, v) : toFunction(v)
  }
  return branchOr1Level(otherwise, k2o)
}