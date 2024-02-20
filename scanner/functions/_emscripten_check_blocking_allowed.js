function _emscripten_check_blocking_allowed() {
          if (ENVIRONMENT_IS_NODE)
            return;
          if (ENVIRONMENT_IS_WORKER)
            return;
          warnOnce("Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread");
        }