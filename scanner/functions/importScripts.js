function importScripts() {
  for (let i = 0; i < arguments.length; i++) {
    const importScriptPath = arguments[i];
    const importScriptSource = getScript(importScriptPath, args.options.baseUrl);
    vm.runInThisContext(importScriptSource, global, {
      filename: /^https?:/.test(importScriptPath) ? importScriptPath : 'data-url://',
    });
  }
}