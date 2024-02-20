function updateDerivedState() {
    var samples = scope.samples
    var mean = samples[0].c.map(function(d, i) {
      return d3.mean(samples, function(d) { return d.c[i] })
    })
    scope.pcaCenter = mean
    function norm(c) { return vector(c).sub(vector(mean)).array() }
    var _svd = svd(samples.map(function(d) { return norm(d.c) }))
    var pc = _svd.U, pc_vals = _svd.S
    // Try to keep the PCA axis pointing consistently as the user drags around
    // the sample points.
    if (vector([pc[0][0], pc[1][0]]).rot() + pi / 2 < 0)
      pc = numeric.mul(pc, -1)
    if (Math.abs(vector([pc[0][0], pc[1][0]]).rot()) > pi / 2)
      pc[0][0] *= -1, pc[1][0] *= -1
    if (vector([pc[0][1], pc[1][1]]).rot() < 0)
      pc[0][1] *= -1, pc[1][1] *= -1

    var pci = numeric.inv(pc)
    scope.pcaSamples = samples.map(function(d) {
      return vector(d.c).sub(vector(mean)).matrixMulti(pci).array()
    })
    scope.pcaVectors = numeric.transpose(pc)
  }