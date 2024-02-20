function quantizedNumber(i) {
    var adjust = [1, 2.5, 5];
    return Math.floor(Math.pow(10, Math.floor(i/3)) * adjust[i % 3]);
  }