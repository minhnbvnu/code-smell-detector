function convertToPercentage(n) {
    if (n <= 1) {
      n = n * 100 + "%";
    }
    return n;
  }