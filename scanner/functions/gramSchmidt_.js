function gramSchmidt_(xs) {
	  var inputIsTensor2D;

	  if (Array.isArray(xs)) {
	    (function () {
	      inputIsTensor2D = false;
	      assert(xs != null && xs.length > 0, function () {
	        return 'Gram-Schmidt process: input must not be null, undefined, or ' + 'empty';
	      });
	      var dim = xs[0].shape[0];

	      var _loop = function _loop(i) {
	        assert(xs[i].shape[0] === dim, function () {
	          return 'Gram-Schmidt: Non-unique lengths found in the input vectors: ' + ("(" + xs[i].shape[0] + " vs. " + dim + ")");
	        });
	      };

	      for (var i = 1; i < xs.length; ++i) {
	        _loop(i);
	      }
	    })();
	  } else {
	    inputIsTensor2D = true;
	    xs = split$1(xs, xs.shape[0], 0).map(function (x) {
	      return squeeze(x, [0]);
	    });
	  }

	  assert(xs.length <= xs[0].shape[0], function () {
	    return "Gram-Schmidt: Number of vectors (" + xs.length + ") exceeds " + ("number of dimensions (" + xs[0].shape[0] + ").");
	  });
	  var ys = [];
	  var xs1d = xs;

	  var _loop2 = function _loop2(i) {
	    ys.push(ENGINE.tidy(function () {
	      var x = xs1d[i];

	      if (i > 0) {
	        for (var j = 0; j < i; ++j) {
	          var proj = mul(sum$1(mul(ys[j], x)), ys[j]);
	          x = sub(x, proj);
	        }
	      }

	      return div(x, norm(x, 'euclidean'));
	    }));
	  };

	  for (var i = 0; i < xs.length; ++i) {
	    _loop2(i);
	  }

	  if (inputIsTensor2D) {
	    return stack(ys, 0);
	  } else {
	    return ys;
	  }
	}