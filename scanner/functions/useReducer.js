function useReducer(reducer, initialArg, init) {
              {
                if (reducer !== basicStateReducer) {
                  currentHookNameInDev = "useReducer";
                }
              }
              currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
              workInProgressHook = createWorkInProgressHook();
              if (isReRender) {
                var queue = workInProgressHook.queue;
                var dispatch = queue.dispatch;
                if (renderPhaseUpdates !== null) {
                  var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
                  if (firstRenderPhaseUpdate !== void 0) {
                    renderPhaseUpdates.delete(queue);
                    var newState = workInProgressHook.memoizedState;
                    var update = firstRenderPhaseUpdate;
                    do {
                      var action = update.action;
                      {
                        isInHookUserCodeInDev = true;
                      }
                      newState = reducer(newState, action);
                      {
                        isInHookUserCodeInDev = false;
                      }
                      update = update.next;
                    } while (update !== null);
                    workInProgressHook.memoizedState = newState;
                    return [newState, dispatch];
                  }
                }
                return [workInProgressHook.memoizedState, dispatch];
              } else {
                {
                  isInHookUserCodeInDev = true;
                }
                var initialState;
                if (reducer === basicStateReducer) {
                  initialState = typeof initialArg === "function" ? initialArg() : initialArg;
                } else {
                  initialState = init !== void 0 ? init(initialArg) : initialArg;
                }
                {
                  isInHookUserCodeInDev = false;
                }
                workInProgressHook.memoizedState = initialState;
                var _queue = workInProgressHook.queue = {
                  last: null,
                  dispatch: null
                };
                var _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);
                return [workInProgressHook.memoizedState, _dispatch];
              }
            }