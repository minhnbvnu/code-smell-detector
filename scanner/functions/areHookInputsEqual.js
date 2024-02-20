function areHookInputsEqual(nextDeps, prevDeps) {
              if (prevDeps === null) {
                {
                  error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev);
                }
                return false;
              }
              {
                if (nextDeps.length !== prevDeps.length) {
                  error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
                }
              }
              for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
                if (objectIs(nextDeps[i], prevDeps[i])) {
                  continue;
                }
                return false;
              }
              return true;
            }