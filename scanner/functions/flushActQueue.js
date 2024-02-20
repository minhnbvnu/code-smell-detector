function flushActQueue(queue) {
              {
                if (!isFlushing) {
                  isFlushing = true;
                  var i = 0;
                  try {
                    for (; i < queue.length; i++) {
                      var callback = queue[i];
                      do {
                        callback = callback(true);
                      } while (callback !== null);
                    }
                    queue.length = 0;
                  } catch (error2) {
                    queue = queue.slice(i + 1);
                    throw error2;
                  } finally {
                    isFlushing = false;
                  }
                }
              }
            }