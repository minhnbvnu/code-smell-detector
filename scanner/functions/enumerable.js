function enumerable(a) {
    var res = [];
    for (var key in a) res.push(key);
    return res;
  }