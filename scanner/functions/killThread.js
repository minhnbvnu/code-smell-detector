function killThread(pthread_ptr) {
          var worker = PThread.pthreads[pthread_ptr];
          delete PThread.pthreads[pthread_ptr];
          worker.terminate();
          __emscripten_thread_free_data(pthread_ptr);
          PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker), 1);
          worker.pthread_ptr = 0;
        }