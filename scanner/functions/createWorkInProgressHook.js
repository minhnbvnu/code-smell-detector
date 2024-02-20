function createWorkInProgressHook() {
              if (workInProgressHook === null) {
                if (firstWorkInProgressHook === null) {
                  isReRender = false;
                  firstWorkInProgressHook = workInProgressHook = createHook();
                } else {
                  isReRender = true;
                  workInProgressHook = firstWorkInProgressHook;
                }
              } else {
                if (workInProgressHook.next === null) {
                  isReRender = false;
                  workInProgressHook = workInProgressHook.next = createHook();
                } else {
                  isReRender = true;
                  workInProgressHook = workInProgressHook.next;
                }
              }
              return workInProgressHook;
            }