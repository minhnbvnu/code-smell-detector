function spawnThread(threadParams) {
          var worker = PThread.getNewWorker();
          if (!worker) {
            return 6;
          }
          PThread.runningWorkers.push(worker);
          PThread.pthreads[threadParams.pthread_ptr] = worker;
          worker.pthread_ptr = threadParams.pthread_ptr;
          var msg = { "cmd": "run", "start_routine": threadParams.startRoutine, "arg": threadParams.arg, "pthread_ptr": threadParams.pthread_ptr };
          if (ENVIRONMENT_IS_NODE) {
            worker.ref();
          }
          worker.postMessage(msg, threadParams.transferList);
          return 0;
        }