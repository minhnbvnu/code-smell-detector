function __emscripten_notify_task_queue(targetThreadId, currThreadId, mainThreadId, queue) {
          if (targetThreadId == currThreadId) {
            setTimeout(() => executeNotifiedProxyingQueue(queue));
          } else if (ENVIRONMENT_IS_PTHREAD) {
            postMessage({ "targetThread": targetThreadId, "cmd": "processProxyingQueue", "queue": queue });
          } else {
            var worker = PThread.pthreads[targetThreadId];
            if (!worker) {
              return;
            }
            worker.postMessage({ "cmd": "processProxyingQueue", "queue": queue });
          }
          return 1;
        }