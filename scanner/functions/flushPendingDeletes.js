function flushPendingDeletes() {
          while (deletionQueue.length) {
            var obj = deletionQueue.pop();
            obj.$$.deleteScheduled = false;
            obj["delete"]();
          }
        }