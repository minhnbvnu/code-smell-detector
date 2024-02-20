function science_lin_decomposeTred2(d, e, V) {
  // This is derived from the Algol procedures tred2 by
  // Bowdler, Martin, Reinsch, and Wilkinson, Handbook for
  // Auto. Comp., Vol.ii-Linear Algebra, and the corresponding
  // Fortran subroutine in EISPACK.

  var n = V.length;

  for (var j = 0; j < n; j++) d[j] = V[n - 1][j];

  // Householder reduction to tridiagonal form.
  for (var i = n - 1; i > 0; i--) {
    // Scale to avoid under/overflow.

    var scale = 0,
        h = 0;
    for (var k = 0; k < i; k++) scale += Math.abs(d[k]);
    if (scale === 0) {
      e[i] = d[i - 1];
      for (var j = 0; j < i; j++) {
        d[j] = V[i - 1][j];
        V[i][j] = 0;
        V[j][i] = 0;
      }
    } else {
      // Generate Householder vector.
      for (var k = 0; k < i; k++) {
        d[k] /= scale;
        h += d[k] * d[k];
      }
      var f = d[i - 1];
      var g = Math.sqrt(h);
      if (f > 0) g = -g;
      e[i] = scale * g;
      h = h - f * g;
      d[i - 1] = f - g;
      for (var j = 0; j < i; j++) e[j] = 0;

      // Apply similarity transformation to remaining columns.

      for (var j = 0; j < i; j++) {
        f = d[j];
        V[j][i] = f;
        g = e[j] + V[j][j] * f;
        for (var k = j+1; k <= i - 1; k++) {
          g += V[k][j] * d[k];
          e[k] += V[k][j] * f;
        }
        e[j] = g;
      }
      f = 0;
      for (var j = 0; j < i; j++) {
        e[j] /= h;
        f += e[j] * d[j];
      }
      var hh = f / (h + h);
      for (var j = 0; j < i; j++) e[j] -= hh * d[j];
      for (var j = 0; j < i; j++) {
        f = d[j];
        g = e[j];
        for (var k = j; k <= i - 1; k++) V[k][j] -= (f * e[k] + g * d[k]);
        d[j] = V[i - 1][j];
        V[i][j] = 0;
      }
    }
    d[i] = h;
  }

  // Accumulate transformations.
  for (var i = 0; i < n - 1; i++) {
    V[n - 1][i] = V[i][i];
    V[i][i] = 1.0;
    var h = d[i + 1];
    if (h != 0) {
      for (var k = 0; k <= i; k++) d[k] = V[k][i + 1] / h;
      for (var j = 0; j <= i; j++) {
        var g = 0;
        for (var k = 0; k <= i; k++) g += V[k][i + 1] * V[k][j];
        for (var k = 0; k <= i; k++) V[k][j] -= g * d[k];
      }
    }
    for (var k = 0; k <= i; k++) V[k][i + 1] = 0;
  }
  for (var j = 0; j < n; j++) {
    d[j] = V[n - 1][j];
    V[n - 1][j] = 0;
  }
  V[n - 1][n - 1] = 1;
  e[0] = 0;
}