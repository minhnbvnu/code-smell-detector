function getScriptletCode(source) {
      if (!validator.isValidScriptletName(source.name)) {
        return null;
      }
      var scriptletFunction = getScriptletFunction(source.name);
      // In case isValidScriptletName check will pass invalid scriptlet name,
      // for example when there is a bad alias
      if (typeof scriptletFunction !== 'function') {
        throw new Error("Error: cannot invoke scriptlet with name: '".concat(source.name, "'"));
      }
      var scriptletFunctionString = scriptletFunction.toString();
      var result = source.engine === 'corelibs' || source.engine === 'test' ? wrapInNonameFunc(scriptletFunctionString) : passSourceAndProps(source, scriptletFunctionString);
      return result;
    }