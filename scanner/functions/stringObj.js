function stringObj(obj, str) {
    str = str.split(".");
    for (var i = 0; i < str.length; i++) {
      if (obj && isDefined(obj[str[i]])) {
        obj = obj[str[i]];
      } else {
        return null;
      }
    }
    return obj;
  }