function parseDirectiveBindings(directive, directiveName) {
    var bindings = {
      isolateScope: null,
      bindToController: null
    };
    if (isObject(directive.scope)) {
      if (directive.bindToController === true) {
        bindings.bindToController = parseIsolateBindings(directive.scope,
                                                         directiveName, true);
        bindings.isolateScope = {};
      } else {
        bindings.isolateScope = parseIsolateBindings(directive.scope,
                                                     directiveName, false);
      }
    }
    if (isObject(directive.bindToController)) {
      bindings.bindToController =
          parseIsolateBindings(directive.bindToController, directiveName, true);
    }
    if (isObject(bindings.bindToController)) {
      var controller = directive.controller;
      var controllerAs = directive.controllerAs;
      if (!controller) {
        // There is no controller, there may or may not be a controllerAs property
        throw $compileMinErr('noctrl',
              "Cannot bind to controller without directive '{0}'s controller.",
              directiveName);
      } else if (!identifierForController(controller, controllerAs)) {
        // There is a controller, but no identifier or controllerAs property
        throw $compileMinErr('noident',
              "Cannot bind to controller without identifier for directive '{0}'.",
              directiveName);
      }
    }
    return bindings;
  }