function useId() {
              var task = currentlyRenderingTask;
              var treeId = getTreeId(task.treeContext);
              var responseState = currentResponseState;
              if (responseState === null) {
                throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
              }
              var localId = localIdCounter++;
              return makeId(responseState, treeId, localId);
            }