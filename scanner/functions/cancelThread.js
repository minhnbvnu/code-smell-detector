function cancelThread(pthread_ptr) {
          var worker = PThread.pthreads[pthread_ptr];
          worker.postMessage({ "cmd": "cancel" });
        }