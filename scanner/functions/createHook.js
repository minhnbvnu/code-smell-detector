function createHook() {
              if (numberOfReRenders > 0) {
                throw new Error("Rendered more hooks than during the previous render");
              }
              return {
                memoizedState: null,
                queue: null,
                next: null
              };
            }