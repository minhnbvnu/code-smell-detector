function __emval_as(handle, returnType, destructorsRef) {
          handle = Emval.toValue(handle);
          returnType = requireRegisteredType(returnType, "emval::as");
          var destructors = [];
          var rd = Emval.toHandle(destructors);
          HEAPU32[destructorsRef >>> 2] = rd;
          return returnType["toWireType"](destructors, handle);
        }