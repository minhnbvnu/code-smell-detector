function exposePublicSymbol(name, value, numArguments) {
          if (Module.hasOwnProperty(name)) {
            if (numArguments === void 0 || Module[name].overloadTable !== void 0 && Module[name].overloadTable[numArguments] !== void 0) {
              throwBindingError("Cannot register public name '" + name + "' twice");
            }
            ensureOverloadTable(Module, name, name);
            if (Module.hasOwnProperty(numArguments)) {
              throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!");
            }
            Module[name].overloadTable[numArguments] = value;
          } else {
            Module[name] = value;
            if (numArguments !== void 0) {
              Module[name].numArguments = numArguments;
            }
          }
        }