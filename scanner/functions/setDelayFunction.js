function setDelayFunction(fn) {
          delayFunction = fn;
          if (deletionQueue.length && delayFunction) {
            delayFunction(flushPendingDeletes);
          }
        }