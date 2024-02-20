function ___emscripten_thread_cleanup(thread) {
          if (!ENVIRONMENT_IS_PTHREAD)
            cleanupThread(thread);
          else
            postMessage({ "cmd": "cleanupThread", "thread": thread });
        }