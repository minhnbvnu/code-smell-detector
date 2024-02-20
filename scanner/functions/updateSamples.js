function updateSamples(p, mat, n) {
    var prev = p
    return [p].concat(d3.range(n - 1)
      .map(function(i) { return prev = prev.matrixMulti(mat) }))
  }