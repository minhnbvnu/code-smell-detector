function addDirective(tDirectives, name, location, maxPriority, ignoreDirective, startAttrName,
                          endAttrName) {
      if (name === ignoreDirective) return null;
      var match = null;
      if (hasDirectives.hasOwnProperty(name)) {
        for (var directive, directives = $injector.get(name + Suffix),
            i = 0, ii = directives.length; i < ii; i++) {
          try {
            directive = directives[i];
            if ((isUndefined(maxPriority) || maxPriority > directive.priority) &&
                 directive.restrict.indexOf(location) != -1) {
              if (startAttrName) {
                directive = inherit(directive, {$$start: startAttrName, $$end: endAttrName});
              }
              if (!directive.$$bindings) {
                var bindings = directive.$$bindings =
                    parseDirectiveBindings(directive, directive.name);
                if (isObject(bindings.isolateScope)) {
                  directive.$$isolateBindings = bindings.isolateScope;
                }
              }
              tDirectives.push(directive);
              match = directive;
            }
          } catch (e) { $exceptionHandler(e); }
        }
      }
      return match;
    }