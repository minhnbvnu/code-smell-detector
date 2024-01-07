function fn_g(x) {
    let result;

    if (x >= 6 / 29) {
      result = x ** 3;
    } else {
      result = 108 / 841 * (x - 4 / 29);
    }

    return result;
  }