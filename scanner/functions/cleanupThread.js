function cleanupThread(pthread_ptr) {
          var worker = PThread.pthreads[pthread_ptr];
          assert(worker);
          PThread.returnWorkerToPool(worker);
        }