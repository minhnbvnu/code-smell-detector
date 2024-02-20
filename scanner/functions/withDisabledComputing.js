function withDisabledComputing(fn, body) {
    cx.disabledComputing = {
      fn: fn,
      prev: cx.disabledComputing
    };
    var result = body();
    cx.disabledComputing = cx.disabledComputing.prev;
    return result;
  }