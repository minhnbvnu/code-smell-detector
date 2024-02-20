function prepareToUseHooks(task, componentIdentity) {
              currentlyRenderingComponent = componentIdentity;
              currentlyRenderingTask = task;
              {
                isInHookUserCodeInDev = false;
              }
              localIdCounter = 0;
            }