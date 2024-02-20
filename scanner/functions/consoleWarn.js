function consoleWarn(str) {
  if (globalObject.console) {
    if (typeof globalObject.console.warn === "function") {
      globalObject.console.warn.apply(globalObject.console, arguments);
    } else {
      consoleLog.call(null, arguments);
    }
  }
}