function siderealTime(d, lw) {
    return rad*(280.16 + 360.9856235*d) - lw;
  }