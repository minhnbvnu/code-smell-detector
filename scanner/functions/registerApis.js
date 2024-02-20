async function registerApis(tpl, app, serverPort, debugPort, debugIde, baseDir, debuggerPath, debugArgs, nasBaseDir, tplPath) {
  // filter all non http trigger functions
  const functions = definition.findFunctionsInTpl(tpl, (funcitonName, functionRes) => {
    const events = functionRes.Events;
    if (events) {
      const triggers = definition.findHttpTriggersInFunction(functionRes);
      if (triggers.length) {
        return false;
      }
    }
    return true;
  });

  await httpSupport.registerApis(app, serverPort, functions, debugPort, debugIde, baseDir, debuggerPath, debugArgs, nasBaseDir, tplPath);
}