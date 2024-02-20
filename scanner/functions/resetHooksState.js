function resetHooksState() {
              {
                isInHookUserCodeInDev = false;
              }
              currentlyRenderingComponent = null;
              currentlyRenderingTask = null;
              didScheduleRenderPhaseUpdate = false;
              firstWorkInProgressHook = null;
              numberOfReRenders = 0;
              renderPhaseUpdates = null;
              workInProgressHook = null;
            }