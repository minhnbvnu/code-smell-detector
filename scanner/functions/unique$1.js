function unique$1(xs) {
	  if (xs == null) {
	    return xs;
	  }

	  var out = []; // TODO(cais): Maybe improve performance by sorting.

	  for (var _iterator3 = _createForOfIteratorHelperLoose(xs), _step3; !(_step3 = _iterator3()).done;) {
	    var x = _step3.value;

	    if (out.indexOf(x) === -1) {
	      out.push(x);
	    }
	  }

	  return out;
	}