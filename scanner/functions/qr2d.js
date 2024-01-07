function qr2d(x, fullMatrices) {
	  if (fullMatrices === void 0) {
	    fullMatrices = false;
	  }

	  return ENGINE.tidy(function () {
	    assert(x.shape.length === 2, function () {
	      return "qr2d() requires a 2D Tensor, but got a " + x.shape.length + "D Tensor.";
	    });
	    var m = x.shape[0];
	    var n = x.shape[1];
	    var q = eye(m); // Orthogonal transform so far.

	    var r = clone(x); // Transformed matrix so far.

	    var one2D = tensor2d([[1]], [1, 1]);
	    var w = clone(one2D);
	    var iters = m >= n ? n : m;

	    var _loop = function _loop(j) {
	      // This tidy within the for-loop ensures we clean up temporary
	      // tensors as soon as they are no longer needed.
	      var rTemp = r;
	      var wTemp = w;
	      var qTemp = q;

	      var _ENGINE$tidy = ENGINE.tidy(function () {
	        // Find H = I - tau * w * w', to put zeros below R(j, j).
	        var rjEnd1 = slice$2(r, [j, j], [m - j, 1]);
	        var normX = norm(rjEnd1);
	        var rjj = slice$2(r, [j, j], [1, 1]); // The sign() function returns 0 on 0, which causes division by zero.

	        var s = where(greater(rjj, 0), tensor2d([[-1]]), tensor2d([[1]]));
	        var u1 = sub(rjj, mul(s, normX));
	        var wPre = div(rjEnd1, u1);

	        if (wPre.shape[0] === 1) {
	          w = clone(one2D);
	        } else {
	          w = concat([one2D, slice$2(wPre, [1, 0], [wPre.shape[0] - 1, wPre.shape[1]])], 0);
	        }

	        var tau = neg(div(matMul(s, u1), normX)); // -- R := HR, Q := QH.

	        var rjEndAll = slice$2(r, [j, 0], [m - j, n]);
	        var tauTimesW = mul(tau, w);
	        var wT = transpose(w);

	        if (j === 0) {
	          r = sub(rjEndAll, matMul(tauTimesW, matMul(wT, rjEndAll)));
	        } else {
	          var rTimesTau = sub(rjEndAll, matMul(tauTimesW, matMul(wT, rjEndAll)));
	          r = concat([slice$2(r, [0, 0], [j, n]), rTimesTau], 0);
	        }

	        var tawTimesWT = transpose(tauTimesW);
	        var qAllJEnd = slice$2(q, [0, j], [m, q.shape[1] - j]);

	        if (j === 0) {
	          q = sub(qAllJEnd, matMul(matMul(qAllJEnd, w), tawTimesWT));
	        } else {
	          var qTimesTau = sub(qAllJEnd, matMul(matMul(qAllJEnd, w), tawTimesWT));
	          q = concat([slice$2(q, [0, 0], [m, j]), qTimesTau], 1);
	        }

	        return [w, r, q];
	      });

	      w = _ENGINE$tidy[0];
	      r = _ENGINE$tidy[1];
	      q = _ENGINE$tidy[2];
	      dispose([rTemp, wTemp, qTemp]);
	    };

	    for (var j = 0; j < iters; ++j) {
	      _loop(j);
	    }

	    if (!fullMatrices && m > n) {
	      q = slice$2(q, [0, 0], [m, n]);
	      r = slice$2(r, [0, 0], [n, n]);
	    }

	    return [q, r];
	  });
	}