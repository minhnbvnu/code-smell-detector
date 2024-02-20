function useMemo(nextCreate, deps) {
              currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
              workInProgressHook = createWorkInProgressHook();
              var nextDeps = deps === void 0 ? null : deps;
              if (workInProgressHook !== null) {
                var prevState = workInProgressHook.memoizedState;
                if (prevState !== null) {
                  if (nextDeps !== null) {
                    var prevDeps = prevState[1];
                    if (areHookInputsEqual(nextDeps, prevDeps)) {
                      return prevState[0];
                    }
                  }
                }
              }
              {
                isInHookUserCodeInDev = true;
              }
              var nextValue = nextCreate();
              {
                isInHookUserCodeInDev = false;
              }
              workInProgressHook.memoizedState = [nextValue, nextDeps];
              return nextValue;
            }