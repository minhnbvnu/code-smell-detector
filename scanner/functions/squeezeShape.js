function squeezeShape(shape, axis) {
	  var newShape = [];
	  var keptDims = [];
	  var isEmptyArray = axis != null && Array.isArray(axis) && axis.length === 0;
	  var axes = axis == null || isEmptyArray ? null : parseAxisParam(axis, shape).sort();
	  var j = 0;

	  for (var i = 0; i < shape.length; ++i) {
	    if (axes != null) {
	      if (axes[j] === i && shape[i] !== 1) {
	        throw new Error("Can't squeeze axis " + i + " since its dim '" + shape[i] + "' is not 1");
	      }

	      if ((axes[j] == null || axes[j] > i) && shape[i] === 1) {
	        newShape.push(shape[i]);
	        keptDims.push(i);
	      }

	      if (axes[j] <= i) {
	        j++;
	      }
	    }

	    if (shape[i] !== 1) {
	      newShape.push(shape[i]);
	      keptDims.push(i);
	    }
	  }

	  return {
	    newShape: newShape,
	    keptDims: keptDims
	  };
	}