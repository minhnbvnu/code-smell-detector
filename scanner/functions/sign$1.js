function sign$1(x) {
	  // TODO(cais): Move to the core.
	  return tidy(function () {
	    var zerosLikeX = zerosLike(x);
	    var onesLikeX = onesLike(x);
	    return where(equal(x, zerosLikeX), zerosLikeX, where(greater(x, zerosLike(x)), onesLikeX, mul(-1, onesLikeX)));
	  });
	}