function qr_(x, fullMatrices) {
	  if (fullMatrices === void 0) {
	    fullMatrices = false;
	  }

	  assert(x.rank >= 2, function () {
	    return "qr() requires input tensor to have a rank >= 2, but got rank " + x.rank;
	  });

	  if (x.rank === 2) {
	    return qr2d(x, fullMatrices);
	  } else {
	    // Rank > 2.
	    // TODO(cais): Below we split the input into individual 2D tensors,
	    //   perform QR decomposition on them and then stack the results back
	    //   together. We should explore whether this can be parallelized.
	    var outerDimsProd = x.shape.slice(0, x.shape.length - 2).reduce(function (value, prev) {
	      return value * prev;
	    });
	    var x2ds = unstack(reshape(x, [outerDimsProd, x.shape[x.shape.length - 2], x.shape[x.shape.length - 1]]), 0);
	    var q2ds = [];
	    var r2ds = [];
	    x2ds.forEach(function (x2d) {
	      var _qr2d = qr2d(x2d, fullMatrices),
	          q2d = _qr2d[0],
	          r2d = _qr2d[1];

	      q2ds.push(q2d);
	      r2ds.push(r2d);
	    });
	    var q = reshape(stack(q2ds, 0), x.shape);
	    var r = reshape(stack(r2ds, 0), x.shape);
	    return [q, r];
	  }
	}