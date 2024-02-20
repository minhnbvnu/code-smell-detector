function getCurrentStackInDEV() {
              {
                if (currentTaskInDEV === null || currentTaskInDEV.componentStack === null) {
                  return "";
                }
                return getStackByComponentStackNode(currentTaskInDEV.componentStack);
              }
            }