function consoleError(str) {
  if (globalObject.console) {
    if (typeof globalObject.console.error === "function") {
      globalObject.console.error.apply(globalObject.console, arguments);
    } else {
      consoleLog(str);
    }
  }
}