function cursorMax(cur1, cur2) {
      if (arguments.length > 2) {
        cur2 = cursorMax.apply(undefined, Array.prototype.slice.call(arguments, 1));
      }
      return cursorIsBefore(cur1, cur2) ? cur2 : cur1;
    }