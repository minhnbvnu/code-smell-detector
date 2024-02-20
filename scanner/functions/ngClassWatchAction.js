function ngClassWatchAction(newVal) {
          if (selector === true || scope.$index % 2 === selector) {
            var newClasses = arrayClasses(newVal || []);
            if (!oldVal) {
              addClasses(newClasses);
            } else if (!equals(newVal,oldVal)) {
              var oldClasses = arrayClasses(oldVal);
              updateClasses(oldClasses, newClasses);
            }
          }
          oldVal = shallowCopy(newVal);
        }