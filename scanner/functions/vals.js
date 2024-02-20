function vals(obj) {
    return keys(obj).map(function (key) {
      return obj[key];
    });
  }