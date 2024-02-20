function evaluateModule (filename, sandbox, evaluatedFiles) {
    if ( evaluatedFiles === void 0 ) evaluatedFiles = {};

    if (evaluatedFiles[filename]) {
      return evaluatedFiles[filename]
    }

    var script = getCompiledScript(filename);
    var compiledWrapper = runInNewContext === false
      ? script.runInThisContext()
      : script.runInNewContext(sandbox);
    var m = { exports: {}};
    var r = function (file) {
      file = path$2.join('.', file);
      if (files[file]) {
        return evaluateModule(file, sandbox, evaluatedFiles)
      } else if (basedir) {
        return require(
          resolvedModules[file] ||
          (resolvedModules[file] = resolve.sync(file, { basedir: basedir }))
        )
      } else {
        return require(file)
      }
    };
    compiledWrapper.call(m.exports, m.exports, r, m);

    var res = Object.prototype.hasOwnProperty.call(m.exports, 'default')
      ? m.exports.default
      : m.exports;
    evaluatedFiles[filename] = res;
    return res
  }