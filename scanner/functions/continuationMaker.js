function continuationMaker(h, parts, initial, state, param) {
    return function () {
      parseCPS(h, parts, initial, state, param);
    };
  }