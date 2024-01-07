function getSubroutineBias(subrs) {
    const numSubrs = subrs.length;
    let bias = 32768;

    if (numSubrs < 1240) {
      bias = 107;
    } else if (numSubrs < 33900) {
      bias = 1131;
    }

    return bias;
  }