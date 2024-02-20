function popComponentStackInDEV(task) {
              {
                if (task.componentStack === null) {
                  error("Unexpectedly popped too many stack frames. This is a bug in React.");
                } else {
                  task.componentStack = task.componentStack.parent;
                }
              }
            }