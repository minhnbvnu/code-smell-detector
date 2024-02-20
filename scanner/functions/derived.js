function derived(o) {
    var opt = o.opt, prev, mat
    var a = opt.basis1, b = opt.basis2, p = opt.pos0
    prev = opt.pos0
    opt.pos[0] = opt.pos0
    d3.range(opt.n - 1).forEach(function(i) {
      opt.pos[i + 1] = prev = matMulti(a, b, prev)
    })
    opt.pointData = d3.range(opt.n).map(function(i) {
      return { pos: function(o) { return o.opt.pixel(o.opt.pos[i]) }, id: i }
    })
    mat = matrix([ [ a[0], b[0] ], [ a[1], b[1] ] ])
    copyTo(mat.eigenVectors(), opt.eigenVectors)
    copyTo(mat.eigenValuesI(), opt.eigenValuesI)
  }