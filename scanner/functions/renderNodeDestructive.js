function renderNodeDestructive(request, task, node) {
              {
                try {
                  return renderNodeDestructiveImpl(request, task, node);
                } catch (x) {
                  if (typeof x === "object" && x !== null && typeof x.then === "function")
                    ;
                  else {
                    lastBoundaryErrorComponentStackDev = lastBoundaryErrorComponentStackDev !== null ? lastBoundaryErrorComponentStackDev : getCurrentStackInDEV();
                  }
                  throw x;
                }
              }
            }