function watchGroupAction() {
          changeReactionScheduled = false;

          if (firstRun) {
            firstRun = false;
            listener(newValues, newValues, self);
          } else {
            listener(newValues, oldValues, self);
          }
        }