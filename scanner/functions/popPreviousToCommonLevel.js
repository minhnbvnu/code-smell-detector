function popPreviousToCommonLevel(prev, next) {
              popNode(prev);
              var parentPrev = prev.parent;
              if (parentPrev === null) {
                throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
              }
              if (parentPrev.depth === next.depth) {
                popToNearestCommonAncestor(parentPrev, next);
              } else {
                popPreviousToCommonLevel(parentPrev, next);
              }
            }