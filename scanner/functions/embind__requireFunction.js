function embind__requireFunction(signature, rawFunction) {
          signature = readLatin1String(signature);
          function makeDynCaller() {
            if (signature.includes("j")) {
              return getDynCaller(signature, rawFunction);
            }
            return getWasmTableEntry(rawFunction);
          }
          var fp = makeDynCaller();
          if (typeof fp != "function") {
            throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction);
          }
          return fp;
        }