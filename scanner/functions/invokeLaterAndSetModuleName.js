function invokeLaterAndSetModuleName(provider, method) {
          return function(recipeName, factoryFunction) {
            if (factoryFunction && isFunction(factoryFunction)) factoryFunction.$$moduleName = name;
            invokeQueue.push([provider, method, arguments]);
            return moduleInstance;
          };
        }