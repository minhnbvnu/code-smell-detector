function transpose$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var perm = attrs.perm;
	  var webglBackend = backend;
	  var xRank = x.shape.length;
	  var newShape = new Array(xRank);

	  for (var i = 0; i < newShape.length; i++) {
	    newShape[i] = x.shape[perm[i]];
	  }

	  var out;

	  if (webglBackend.shouldExecuteOnCPU([x])) {
	    var xTexData = webglBackend.texData.get(x.dataId);
	    var values = xTexData.values;
	    var outValues = transposeImplCPU(values, x.shape, x.dtype, perm, newShape);
	    out = webglBackend.makeTensorInfo(newShape, x.dtype);
	    var outData = webglBackend.texData.get(out.dataId);
	    outData.values = outValues;
	  } else {
	    out = transposeImpl$1(x, perm, webglBackend);
	  }

	  return out;
	}