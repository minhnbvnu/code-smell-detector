function __orderModules(context, modules) {
  // 'a-version' first
  __pushModule(context, modules, 'a-version');
  // others
  for (const key in modules) {
    if (key !== 'a-version') {
      __pushModule(context, modules, key);
    }
  }
  // combine last
  for (const module of context.modulesLast) {
    context.modulesArray.push(module);
  }
}