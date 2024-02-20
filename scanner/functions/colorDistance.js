function colorDistance(a, b) {
    return Math.sqrt(
      Math.pow( ((a[0]) - (b[0])), 2 ) +
      Math.pow( ((a[1]) - (b[1])), 2 ) +
      Math.pow( ((a[2]) - (b[2])), 2 )
    );
  }