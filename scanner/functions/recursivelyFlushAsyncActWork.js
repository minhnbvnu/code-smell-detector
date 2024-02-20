function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
              {
                var queue = ReactCurrentActQueue.current;
                if (queue !== null) {
                  try {
                    flushActQueue(queue);
                    enqueueTask(function() {
                      if (queue.length === 0) {
                        ReactCurrentActQueue.current = null;
                        resolve(returnValue);
                      } else {
                        recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                      }
                    });
                  } catch (error2) {
                    reject(error2);
                  }
                } else {
                  resolve(returnValue);
                }
              }
            }