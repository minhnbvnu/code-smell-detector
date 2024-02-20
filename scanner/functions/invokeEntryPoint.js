function invokeEntryPoint(ptr, arg) {
          var result = getWasmTableEntry(ptr)(arg);
          if (keepRuntimeAlive()) {
            PThread.setExitStatus(result);
          } else {
            __emscripten_thread_exit(result);
          }
        }