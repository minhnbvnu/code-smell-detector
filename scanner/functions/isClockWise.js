function isClockWise(ring) {
    return 0 < ring.reduce((a, b, c, d) => {
      return a + ((c < d.length - 1) ? (d[c+1][0] - b[0]) * (d[c+1][1] + b[1]) : 0);
    }, 0);
  }