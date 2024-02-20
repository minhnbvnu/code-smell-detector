function _emscripten_receive_on_main_thread_js(index, numCallArgs, args) {
          _emscripten_receive_on_main_thread_js_callArgs.length = numCallArgs;
          var b = args >> 3;
          for (var i = 0; i < numCallArgs; i++) {
            _emscripten_receive_on_main_thread_js_callArgs[i] = GROWABLE_HEAP_F64()[b + i >>> 0];
          }
          var func = proxiedFunctionTable[index];
          return func.apply(null, _emscripten_receive_on_main_thread_js_callArgs);
        }