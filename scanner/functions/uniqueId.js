function uniqueId(prefix) {
      var id = ++idCounter;
      return toString(prefix) + id;
    }