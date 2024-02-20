function replacePublicSymbol(name, value, numArguments) {
          if (!Module.hasOwnProperty(name)) {
            throwInternalError("Replacing nonexistant public symbol");
          }
          if (Module[name].overloadTable !== void 0 && numArguments !== void 0) {
            Module[name].overloadTable[numArguments] = value;
          } else {
            Module[name] = value;
            Module[name].argCount = numArguments;
          }
        }