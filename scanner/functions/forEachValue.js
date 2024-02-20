function forEachValue(obj, fn) {
    keys(obj).forEach(function (key) {
      if (obj.hasOwnProperty(key)) {
        fn(obj[key]);
      }
    });
  }