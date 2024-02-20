function _proc_exit(code) {
          if (ENVIRONMENT_IS_PTHREAD)
            return _emscripten_proxy_to_main_thread_js(1, 1, code);
          EXITSTATUS = code;
          if (!keepRuntimeAlive()) {
            PThread.terminateAllThreads();
            if (Module["onExit"])
              Module["onExit"](code);
            ABORT = true;
          }
          quit_(code, new ExitStatus(code));
        }