function popAllPrevious(prev) {
              popNode(prev);
              var parentPrev = prev.parent;
              if (parentPrev !== null) {
                popAllPrevious(parentPrev);
              }
            }