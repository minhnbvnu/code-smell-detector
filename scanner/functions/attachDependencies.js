function attachDependencies(scriptlet) {
      var _scriptlet$injections = scriptlet.injections,
        injections = _scriptlet$injections === void 0 ? [] : _scriptlet$injections;
      return injections.reduce(function (accum, dep) {
        return "".concat(accum, "\n").concat(dep.toString());
      }, scriptlet.toString());
    }