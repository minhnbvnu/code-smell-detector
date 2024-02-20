function popToNearestCommonAncestor(prev, next) {
              if (prev === next)
                ;
              else {
                popNode(prev);
                var parentPrev = prev.parent;
                var parentNext = next.parent;
                if (parentPrev === null) {
                  if (parentNext !== null) {
                    throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
                  }
                } else {
                  if (parentNext === null) {
                    throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
                  }
                  popToNearestCommonAncestor(parentPrev, parentNext);
                }
                pushNode(next);
              }
            }