function wrapModuleNameIfDefined(moduleName) {
        return moduleName ?
          (' (module: ' + moduleName + ')') :
          '';
      }