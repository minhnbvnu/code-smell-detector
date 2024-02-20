function keySet(array) {
    var keys = {};
    for (var i = 0; i < array.length; ++i) { keys[array[i]] = true; }
    return keys;
  }