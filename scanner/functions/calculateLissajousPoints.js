function calculateLissajousPoints() {
    for (var i = 0; i <= pointCount; i++) {
      var angle = p.map(i, 0, pointCount, 0, p.TAU);

      var x = p.sin(angle * freqX + p.radians(phi)) * p.cos(angle * modFreqX);
      var y = p.sin(angle * freqY) * p.cos(angle * modFreqY);
      x *= p.width / 2 - 30;
      y *= p.height / 2 - 30;

      lissajousPoints[i] = p.createVector(x,y);
    }
  }