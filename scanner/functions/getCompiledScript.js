function getCompiledScript (filename) {
    if (compiledScripts[filename]) {
      return compiledScripts[filename]
    }
    var code = files[filename];
    var wrapper = NativeModule.wrap(code);
    var script = new vm.Script(wrapper, {
      filename: filename,
      displayErrors: true
    });
    compiledScripts[filename] = script;
    return script
  }