function pushAllNext(next) {
              var parentNext = next.parent;
              if (parentNext !== null) {
                pushAllNext(parentNext);
              }
              pushNode(next);
            }