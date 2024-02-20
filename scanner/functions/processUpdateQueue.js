function processUpdateQueue(internalInstance, inst, props, maskedLegacyContext) {
              if (internalInstance.queue !== null && internalInstance.queue.length > 0) {
                var oldQueue = internalInstance.queue;
                var oldReplace = internalInstance.replace;
                internalInstance.queue = null;
                internalInstance.replace = false;
                if (oldReplace && oldQueue.length === 1) {
                  inst.state = oldQueue[0];
                } else {
                  var nextState = oldReplace ? oldQueue[0] : inst.state;
                  var dontMutate = true;
                  for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
                    var partial = oldQueue[i];
                    var partialState = typeof partial === "function" ? partial.call(inst, nextState, props, maskedLegacyContext) : partial;
                    if (partialState != null) {
                      if (dontMutate) {
                        dontMutate = false;
                        nextState = assign({}, nextState, partialState);
                      } else {
                        assign(nextState, partialState);
                      }
                    }
                  }
                  inst.state = nextState;
                }
              } else {
                internalInstance.queue = null;
              }
            }