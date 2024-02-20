function act(callback) {
              {
                var prevActScopeDepth = actScopeDepth;
                actScopeDepth++;
                if (ReactCurrentActQueue.current === null) {
                  ReactCurrentActQueue.current = [];
                }
                var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
                var result;
                try {
                  ReactCurrentActQueue.isBatchingLegacy = true;
                  result = callback();
                  if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                    var queue = ReactCurrentActQueue.current;
                    if (queue !== null) {
                      ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                      flushActQueue(queue);
                    }
                  }
                } catch (error2) {
                  popActScope(prevActScopeDepth);
                  throw error2;
                } finally {
                  ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
                }
                if (result !== null && typeof result === "object" && typeof result.then === "function") {
                  var thenableResult = result;
                  var wasAwaited = false;
                  var thenable = {
                    then: function(resolve, reject) {
                      wasAwaited = true;
                      thenableResult.then(function(returnValue2) {
                        popActScope(prevActScopeDepth);
                        if (actScopeDepth === 0) {
                          recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                        } else {
                          resolve(returnValue2);
                        }
                      }, function(error2) {
                        popActScope(prevActScopeDepth);
                        reject(error2);
                      });
                    }
                  };
                  {
                    if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                      Promise.resolve().then(function() {
                      }).then(function() {
                        if (!wasAwaited) {
                          didWarnNoAwaitAct = true;
                          error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                        }
                      });
                    }
                  }
                  return thenable;
                } else {
                  var returnValue = result;
                  popActScope(prevActScopeDepth);
                  if (actScopeDepth === 0) {
                    var _queue = ReactCurrentActQueue.current;
                    if (_queue !== null) {
                      flushActQueue(_queue);
                      ReactCurrentActQueue.current = null;
                    }
                    var _thenable = {
                      then: function(resolve, reject) {
                        if (ReactCurrentActQueue.current === null) {
                          ReactCurrentActQueue.current = [];
                          recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                        } else {
                          resolve(returnValue);
                        }
                      }
                    };
                    return _thenable;
                  } else {
                    var _thenable2 = {
                      then: function(resolve, reject) {
                        resolve(returnValue);
                      }
                    };
                    return _thenable2;
                  }
                }
              }
            }