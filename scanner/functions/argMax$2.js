function argMax$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var axis = attrs.axis;
	  var axes = parseAxisParam(axis, x.shape);
	  var permutedAxes = getAxesPermutation(axes, x.shape.length);
	  var $x = x;
	  var intermediateTensorInfos = [];

	  if (permutedAxes != null) {
	    $x = transpose$2({
	      inputs: {
	        x: x
	      },
	      backend: backend,
	      attrs: {
	        perm: permutedAxes
	      }
	    });
	    intermediateTensorInfos.push($x);
	    axes = getInnerMostAxes(axes.length, $x.shape.length);
	  }

	  assertAxesAreInnerMostDims('argMax', [axes[0]], $x.shape.length);
	  var out = argMinMaxReduce(backend, $x, axes[0], 'max');
	  intermediateTensorInfos.forEach(function (t) {
	    return backend.disposeIntermediateTensorInfo(t);
	  });
	  return out;
	}