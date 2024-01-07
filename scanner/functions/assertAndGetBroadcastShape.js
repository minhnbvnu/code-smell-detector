function assertAndGetBroadcastShape(shapeA, shapeB) {
	  var result = [];
	  var l = Math.max(shapeA.length, shapeB.length);

	  for (var i = 0; i < l; i++) {
	    var a = shapeA[shapeA.length - i - 1];

	    if (a == null) {
	      a = 1;
	    }

	    var b = shapeB[shapeB.length - i - 1];

	    if (b == null) {
	      b = 1;
	    }

	    if (a === 1) {
	      result.unshift(b);
	    } else if (b === 1) {
	      result.unshift(a);
	    } else if (a !== b) {
	      var errMsg = "Operands could not be broadcast together with shapes " + (shapeA + " and " + shapeB + ".");
	      throw Error(errMsg);
	    } else {
	      result.unshift(a);
	    }
	  }

	  return result;
	}