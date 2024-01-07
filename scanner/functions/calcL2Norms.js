function calcL2Norms(w, axis) {
	  return tidy(function () {
	    return sqrt$3(sum$1(mul(w, w), axis, true));
	  });
	}