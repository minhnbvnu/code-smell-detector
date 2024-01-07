function sign_(x) {
	  var $x = convertToTensor(x, 'x', 'sign');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Sign, inputs);
	}