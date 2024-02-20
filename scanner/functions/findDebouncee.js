function findDebouncee(target, method) {
      var debouncee,
          index = -1;

      for (var i = 0, l = debouncees.length; i < l; i++) {
        debouncee = debouncees[i];
        if (debouncee[0] === target && debouncee[1] === method) {
          index = i;
          break;
        }
      }

      return index;
    }