function writeModuleFile(module, modulesDir, encoding) {
  const {code, id} = module;
  return writeFile(path.join(modulesDir, id + '.js'), code, encoding);
}