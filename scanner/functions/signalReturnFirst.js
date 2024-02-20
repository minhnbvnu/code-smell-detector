function signalReturnFirst(type, a1, a2, a3, a4) {
    var arr = getHandlers(this, type);
    for (var i = 0; i < arr.length; ++i) {
      var result = arr[i].call(this, a1, a2, a3, a4);
      if (result) return result;
    }
  }