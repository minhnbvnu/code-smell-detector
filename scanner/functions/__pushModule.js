function __pushModule(context, modules, moduleRelativeName) {
  // check if disable
  if (context.disabledModules[moduleRelativeName]) return false;

  // module
  const module = modules[moduleRelativeName];
  if (module.__ordering) return true;
  module.__ordering = true;

  // dependencies
  if (!__orderDependencies(context, modules, module, moduleRelativeName)) {
    context.disabledModules[moduleRelativeName] = true;
    return false;
  }

  // push this
  context.modules[moduleRelativeName] = module;
  if (module.package && module.package.eggBornModule && module.package.eggBornModule.last === true) {
    context.modulesLast.push(module);
  } else {
    context.modulesArray.push(module);
  }

  return true;
}