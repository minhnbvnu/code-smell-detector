function each (obj, fn) {
      var key;
      for (key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          fn(key);
        }
      }
    }