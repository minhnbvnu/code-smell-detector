function popActScope(prevActScopeDepth) {
              {
                if (prevActScopeDepth !== actScopeDepth - 1) {
                  error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
                }
                actScopeDepth = prevActScopeDepth;
              }
            }