function getBBox(ring) {
    let
      x =  Infinity, y =  Infinity,
      X = -Infinity, Y = -Infinity;

    for (let i = 0; i < ring.length; i++) {
      x = Math.min(x, ring[i][0]);
      y = Math.min(y, ring[i][1]);

      X = Math.max(X, ring[i][0]);
      Y = Math.max(Y, ring[i][1]);
    }

    return { minX:x, minY:y, maxX:X, maxY:Y };
  }