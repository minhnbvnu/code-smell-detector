function enqueueTask(task) {
              if (enqueueTaskImpl === null) {
                try {
                  var requireString = ("require" + Math.random()).slice(0, 7);
                  var nodeRequire = module && module[requireString];
                  enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
                } catch (_err) {
                  enqueueTaskImpl = function(callback) {
                    {
                      if (didWarnAboutMessageChannel === false) {
                        didWarnAboutMessageChannel = true;
                        if (typeof MessageChannel === "undefined") {
                          error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                        }
                      }
                    }
                    var channel = new MessageChannel();
                    channel.port1.onmessage = callback;
                    channel.port2.postMessage(void 0);
                  };
                }
              }
              return enqueueTaskImpl(task);
            }