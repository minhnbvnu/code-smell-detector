function growRingTop(str) {
    if (!killRing.length) return addToRing(str);
    killRing[killRing.length - 1] += str;
  }