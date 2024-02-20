function parseIsolateBindings(scope, directiveName, isController) {
    var LOCAL_REGEXP = /^\s*([@&<]|=(\*?))(\??)\s*(\w*)\s*$/;

    var bindings = {};

    forEach(scope, function(definition, scopeName) {
      if (definition in bindingCache) {
        bindings[scopeName] = bindingCache[definition];
        return;
      }
      var match = definition.match(LOCAL_REGEXP);

      if (!match) {
        throw $compileMinErr('iscp',
            "Invalid {3} for directive '{0}'." +
            " Definition: {... {1}: '{2}' ...}",
            directiveName, scopeName, definition,
            (isController ? "controller bindings definition" :
            "isolate scope definition"));
      }

      bindings[scopeName] = {
        mode: match[1][0],
        collection: match[2] === '*',
        optional: match[3] === '?',
        attrName: match[4] || scopeName
      };
      if (match[4]) {
        bindingCache[definition] = bindings[scopeName];
      }
    });

    return bindings;
  }