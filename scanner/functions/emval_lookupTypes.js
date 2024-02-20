function emval_lookupTypes(argCount, argTypes) {
          var a = new Array(argCount);
          for (var i = 0; i < argCount; ++i) {
            a[i] = requireRegisteredType(HEAPU32[argTypes + i * 4 >>> 2], "parameter " + i);
          }
          return a;
        }