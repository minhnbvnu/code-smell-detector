function switchContext(newSnapshot) {
              var prev = currentActiveSnapshot;
              var next = newSnapshot;
              if (prev !== next) {
                if (prev === null) {
                  pushAllNext(next);
                } else if (next === null) {
                  popAllPrevious(prev);
                } else if (prev.depth === next.depth) {
                  popToNearestCommonAncestor(prev, next);
                } else if (prev.depth > next.depth) {
                  popPreviousToCommonLevel(prev, next);
                } else {
                  popNextToCommonLevel(prev, next);
                }
                currentActiveSnapshot = next;
              }
            }