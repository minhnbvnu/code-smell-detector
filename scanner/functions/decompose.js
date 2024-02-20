function decompose(A) {
    var n = A.length, // column dimension
        V = [],
        d = [],
        e = [];

    for (var i = 0; i < n; i++) {
      V[i] = [];
      d[i] = [];
      e[i] = [];
    }

    var symmetric = true;
    for (var j = 0; j < n; j++) {
      for (var i = 0; i < n; i++) {
        if (A[i][j] !== A[j][i]) {
          symmetric = false;
          break;
        }
      }
    }

    if (symmetric) {
      for (var i = 0; i < n; i++) V[i] = A[i].slice();

      // Tridiagonalize.
      science_lin_decomposeTred2(d, e, V);

      // Diagonalize.
      science_lin_decomposeTql2(d, e, V);
    } else {
      var H = [];
      for (var i = 0; i < n; i++) H[i] = A[i].slice();

      // Reduce to Hessenberg form.
      science_lin_decomposeOrthes(H, V);

      // Reduce Hessenberg to real Schur form.
      science_lin_decomposeHqr2(d, e, H, V);
    }

    var D = [];
    for (var i = 0; i < n; i++) {
      var row = D[i] = [];
      for (var j = 0; j < n; j++) row[j] = i === j ? d[i] : 0;
      D[i][e[i] > 0 ? i + 1 : i - 1] = e[i];
    }
    return {D: D, V: V};
  }