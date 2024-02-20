async function registerHttpTriggers(app, router, serverPort, httpTriggers, debugPort, debugIde, baseDir, debuggerPath, debugArgs, nasBaseDir, tplPath) {
  for (let httpTrigger of httpTriggers) {
    await registerSingleHttpTrigger(app, router, serverPort, httpTrigger, debugPort, debugIde, baseDir, false, debuggerPath, debugArgs, nasBaseDir, tplPath);
  }
  console.log();
}