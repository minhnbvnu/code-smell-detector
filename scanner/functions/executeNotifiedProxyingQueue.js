function executeNotifiedProxyingQueue(queue) {
          Atomics.store(GROWABLE_HEAP_I32(), queue >> 2, 1);
          if (_pthread_self()) {
            __emscripten_proxy_execute_task_queue(queue);
          }
          Atomics.compareExchange(GROWABLE_HEAP_I32(), queue >> 2, 1, 0);
        }