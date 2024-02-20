function popNextToCommonLevel(prev, next) {
              var parentNext = next.parent;
              if (parentNext === null) {
                throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
              }
              if (prev.depth === parentNext.depth) {
                popToNearestCommonAncestor(prev, parentNext);
              } else {
                popNextToCommonLevel(prev, parentNext);
              }
              pushNode(next);
            }