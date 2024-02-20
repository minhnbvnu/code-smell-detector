function useRef(initialValue) {
              currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
              workInProgressHook = createWorkInProgressHook();
              var previousRef = workInProgressHook.memoizedState;
              if (previousRef === null) {
                var ref = {
                  current: initialValue
                };
                {
                  Object.seal(ref);
                }
                workInProgressHook.memoizedState = ref;
                return ref;
              } else {
                return previousRef;
              }
            }