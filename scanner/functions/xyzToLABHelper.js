function xyzToLABHelper(i) {
    if (i > ColorLAB.epsilon) {
      return Math.pow(i, 1 / 3);
    }

    return (ColorLAB.kappa * i + 16) / 116;
  }