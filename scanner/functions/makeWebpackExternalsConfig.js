function makeWebpackExternalsConfig(moduleNames) {
  return moduleNames.reduce((externals, moduleName) => Object.assign(externals, {
    [moduleName]: `commonjs ${moduleName}`,
  }), {});
}