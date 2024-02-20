function makeScope(prev, isCatch) {
    return {vars: Object.create(null), prev: prev, isCatch: isCatch};
  }