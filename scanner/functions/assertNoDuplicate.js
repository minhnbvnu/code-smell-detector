function assertNoDuplicate(what, previousDirective, directive, element) {

      function wrapModuleNameIfDefined(moduleName) {
        return moduleName ?
          (' (module: ' + moduleName + ')') :
          '';
      }

      if (previousDirective) {
        throw $compileMinErr('multidir', 'Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}',
            previousDirective.name, wrapModuleNameIfDefined(previousDirective.$$moduleName),
            directive.name, wrapModuleNameIfDefined(directive.$$moduleName), what, startingTag(element));
      }
    }