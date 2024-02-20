function ___emscripten_init_main_thread_js(tb) {
          __emscripten_thread_init(tb, !ENVIRONMENT_IS_WORKER, 1, !ENVIRONMENT_IS_WEB);
          PThread.threadInitTLS();
        }