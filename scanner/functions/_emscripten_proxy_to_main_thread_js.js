function _emscripten_proxy_to_main_thread_js(index, sync) {
          var numCallArgs = arguments.length - 2;
          var outerArgs = arguments;
          return withStackSave(() => {
            var serializedNumCallArgs = numCallArgs;
            var args = stackAlloc(serializedNumCallArgs * 8);
            var b = args >> 3;
            for (var i = 0; i < numCallArgs; i++) {
              var arg = outerArgs[2 + i];
              GROWABLE_HEAP_F64()[b + i >>> 0] = arg;
            }
            return _emscripten_run_in_main_runtime_thread_js(index, serializedNumCallArgs, args, sync);
          });
        }