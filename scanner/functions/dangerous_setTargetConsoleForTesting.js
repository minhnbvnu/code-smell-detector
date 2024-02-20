function dangerous_setTargetConsoleForTesting(targetConsoleForTesting) {
  targetConsole = targetConsoleForTesting;
  targetConsoleMethods = {};

  for (const method in targetConsole) {
    targetConsoleMethods[method] = console[method];
  }
}