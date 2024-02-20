function updateClasses(oldClasses, newClasses) {
          var toAdd = arrayDifference(newClasses, oldClasses);
          var toRemove = arrayDifference(oldClasses, newClasses);
          toAdd = digestClassCounts(toAdd, 1);
          toRemove = digestClassCounts(toRemove, -1);
          if (toAdd && toAdd.length) {
            $animate.addClass(element, toAdd);
          }
          if (toRemove && toRemove.length) {
            $animate.removeClass(element, toRemove);
          }
        }