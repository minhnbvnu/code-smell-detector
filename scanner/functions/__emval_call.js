function __emval_call(handle, argCount, argTypes, argv) {
          handle = Emval.toValue(handle);
          var types = emval_lookupTypes(argCount, argTypes);
          var args = new Array(argCount);
          for (var i = 0; i < argCount; ++i) {
            var type = types[i];
            args[i] = type["readValueFromPointer"](argv);
            argv += type["argPackAdvance"];
          }
          var rv = handle.apply(void 0, args);
          return Emval.toHandle(rv);
        }