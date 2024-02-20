function __bindSuitesModules(suites, modules) {
  for (const moduleName in modules) {
    const module = modules[moduleName];
    // check
    let res = module.root.match(__suite_pattern1);
    if (!res) {
      res = module.root.match(__suite_pattern2);
    }
    if (!res) continue;
    // suiteName
    const suiteName = res[1];
    const suite = suites[suiteName];
    if (!suite) {
      // means disabled
      delete modules[moduleName];
    } else {
      // bind
      module.suite = suiteName;
      suite.modules.push(moduleName);
    }
  }
}