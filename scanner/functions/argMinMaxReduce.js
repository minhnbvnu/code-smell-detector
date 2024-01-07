function argMinMaxReduce(backend, x, axis, reduceType) {
	  var axes = [axis];
	  assertAxesAreInnerMostDims('arg' + reduceType.charAt(0).toUpperCase() + reduceType.slice(1), axes, x.shape.length);

	  if (!env().getBool('WEBGL_PACK_REDUCE') || x.shape.length <= 2) {
	    var intermediateTensorInfos = [];

	    var _backend_util$compute = computeOutAndReduceShapes(x.shape, axes),
	        outShape = _backend_util$compute[0],
	        reduceShape = _backend_util$compute[1];

	    var inSize = sizeFromShape(reduceShape);
	    var a2D = reshape$3({
	      inputs: {
	        x: x
	      },
	      backend: backend,
	      attrs: {
	        shape: [-1, inSize]
	      }
	    });
	    intermediateTensorInfos.push(a2D);
	    var reduced = argReduce(backend, a2D, reduceType);
	    intermediateTensorInfos.push(reduced);
	    var reshaped = reshape$3({
	      inputs: {
	        x: reduced
	      },
	      backend: backend,
	      attrs: {
	        shape: outShape
	      }
	    });
	    intermediateTensorInfos.forEach(function (t) {
	      return backend.disposeIntermediateTensorInfo(t);
	    });
	    return reshaped;
	  }

	  return argReducePacked(backend, x, reduceType);
	}