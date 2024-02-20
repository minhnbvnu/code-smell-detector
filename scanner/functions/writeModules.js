function writeModules(modules, modulesDir, encoding) {
  const writeFiles =
    modules.map(module => writeModuleFile(module, modulesDir, encoding));
  return Promise.all(writeFiles);
}