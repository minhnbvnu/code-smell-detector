function removeClasses(classes) {
          var newClasses = digestClassCounts(classes, -1);
          attr.$removeClass(newClasses);
        }