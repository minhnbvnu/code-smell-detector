function __embind_register_class_constructor(rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) {
          assert(argCount > 0);
          var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
          invoker = embind__requireFunction(invokerSignature, invoker);
          whenDependentTypesAreResolved([], [rawClassType], function(classType) {
            classType = classType[0];
            var humanName = "constructor " + classType.name;
            if (classType.registeredClass.constructor_body === void 0) {
              classType.registeredClass.constructor_body = [];
            }
            if (classType.registeredClass.constructor_body[argCount - 1] !== void 0) {
              throw new BindingError("Cannot register multiple constructors with identical number of parameters (" + (argCount - 1) + ") for class '" + classType.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
            }
            classType.registeredClass.constructor_body[argCount - 1] = () => {
              throwUnboundTypeError("Cannot construct " + classType.name + " due to unbound types", rawArgTypes);
            };
            whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
              argTypes.splice(1, 0, null);
              classType.registeredClass.constructor_body[argCount - 1] = craftInvokerFunction(humanName, argTypes, null, invoker, rawConstructor);
              return [];
            });
            return [];
          });
        }