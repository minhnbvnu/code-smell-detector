function science_lin_decomposeOrthes(H, V) {
  // This is derived from the Algol procedures orthes and ortran,
  // by Martin and Wilkinson, Handbook for Auto. Comp.,
  // Vol.ii-Linear Algebra, and the corresponding
  // Fortran subroutines in EISPACK.

  var n = H.length;
  var ort = [];

  var low = 0;
  var high = n - 1;

  for (var m = low + 1; m < high; m++) {
    // Scale column.
    var scale = 0;
    for (var i = m; i <= high; i++) scale += Math.abs(H[i][m - 1]);

    if (scale !== 0) {
      // Compute Householder transformation.
      var h = 0;
      for (var i = high; i >= m; i--) {
        ort[i] = H[i][m - 1] / scale;
        h += ort[i] * ort[i];
      }
      var g = Math.sqrt(h);
      if (ort[m] > 0) g = -g;
      h = h - ort[m] * g;
      ort[m] = ort[m] - g;

      // Apply Householder similarity transformation
      // H = (I-u*u'/h)*H*(I-u*u')/h)
      for (var j = m; j < n; j++) {
        var f = 0;
        for (var i = high; i >= m; i--) f += ort[i] * H[i][j];
        f /= h;
        for (var i = m; i <= high; i++) H[i][j] -= f * ort[i];
      }

      for (var i = 0; i <= high; i++) {
        var f = 0;
        for (var j = high; j >= m; j--) f += ort[j] * H[i][j];
        f /= h;
        for (var j = m; j <= high; j++) H[i][j] -= f * ort[j];
      }
      ort[m] = scale * ort[m];
      H[m][m - 1] = scale * g;
    }
  }

  // Accumulate transformations (Algol's ortran).
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) V[i][j] = i === j ? 1 : 0;
  }

  for (var m = high-1; m >= low+1; m--) {
    if (H[m][m - 1] !== 0) {
      for (var i = m + 1; i <= high; i++) ort[i] = H[i][m - 1];
      for (var j = m; j <= high; j++) {
        var g = 0;
        for (var i = m; i <= high; i++) g += ort[i] * V[i][j];
        // Double division avoids possible underflow
        g = (g / ort[m]) / H[m][m - 1];
        for (var i = m; i <= high; i++) V[i][j] += g * ort[i];
      }
    }
  }
}