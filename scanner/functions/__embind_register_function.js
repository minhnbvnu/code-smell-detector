function __embind_register_function(name, argCount, rawArgTypesAddr, signature, rawInvoker, fn) {
          var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
          name = readLatin1String(name);
          rawInvoker = embind__requireFunction(signature, rawInvoker);
          exposePublicSymbol(name, function() {
            throwUnboundTypeError("Cannot call " + name + " due to unbound types", argTypes);
          }, argCount - 1);
          whenDependentTypesAreResolved([], argTypes, function(argTypes2) {
            var invokerArgsArray = [argTypes2[0], null].concat(argTypes2.slice(1));
            replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn), argCount - 1);
            return [];
          });
        }