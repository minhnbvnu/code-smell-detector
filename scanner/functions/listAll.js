function listAll() {
  return listFns()
    .concat(listFPFns())
    .concat(extraModules)
    .reduce((acc, module) => {
      const esmModule = Object.assign({}, module, {
        fullPath: module.fullPath.replace('./src/', './src/esm/'),
      })
      return acc.concat([module, esmModule])
    }, [])
    .concat([])
}