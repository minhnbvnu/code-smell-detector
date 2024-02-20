function finishHooks(Component, props, children, refOrContext) {
              while (didScheduleRenderPhaseUpdate) {
                didScheduleRenderPhaseUpdate = false;
                localIdCounter = 0;
                numberOfReRenders += 1;
                workInProgressHook = null;
                children = Component(props, refOrContext);
              }
              resetHooksState();
              return children;
            }