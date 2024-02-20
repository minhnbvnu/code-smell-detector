function makeKeyRange(start, size) {
      var keys = [];
      for (var i = start; i < start + size; i++) {
        keys.push(String.fromCharCode(i));
      }
      return keys;
    }