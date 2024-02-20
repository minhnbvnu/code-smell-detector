function eggBornMglob(options) {
  const { projectPath, disabledModules, disabledSuites, log, type } = options;
  // context
  const context = {
    options,
    suites: {},
    modules: {},
    modulesArray: [],
    modulesLast: [],
    //
    modulesLocal: {},
    modulesGlobal: {},
    modulesMonkey: {},
    //
    suitesLocal: {},
    suitesVendor: {},
    //
    disabledModules: __getDisabledModules(disabledModules),
    disabledSuites: __getDisabledSuites(disabledSuites),
  };

  // parse suites
  const suites = __parseSuites(projectPath);
  // parse modules
  const modules = __parseModules(projectPath, type);
  // bind suites modules
  __bindSuitesModules(suites, modules);

  // check suites
  __checkSuites(context, suites);

  // order
  __orderModules(context, modules);
  // log
  __logModules(context, log);
  __logSuites(context, log);

  // ok
  return {
    suites: context.suites,
    modules: context.modules,
    modulesArray: context.modulesArray,
    //
    modulesLocal: context.modulesLocal,
    modulesGlobal: context.modulesGlobal,
    modulesMonkey: context.modulesMonkey,
    //
    suitesLocal: context.suitesLocal,
    suitesVendor: context.suitesVendor,
  };
}