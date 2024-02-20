function getWasmTableEntry(funcPtr) {
          var func = wasmTableMirror[funcPtr];
          if (!func) {
            if (funcPtr >= wasmTableMirror.length)
              wasmTableMirror.length = funcPtr + 1;
            wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
          }
          return func;
        }