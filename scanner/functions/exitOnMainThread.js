function exitOnMainThread(returnCode) {
          if (ENVIRONMENT_IS_PTHREAD)
            return _emscripten_proxy_to_main_thread_js(2, 0, returnCode);
          try {
            _exit(returnCode);
          } catch (e) {
            handleException(e);
          }
        }