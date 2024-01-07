function reverse$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var dims = attrs.dims;
	  assertNotComplex(x, 'reverse');
	  var xRank = x.shape.length;
	  var $dims = parseAxisParam(dims, x.shape);

	  if (xRank === 0) {
	    return identity$1({
	      inputs: {
	        x: x
	      },
	      backend: backend
	    });
	  }

	  var outBuf = new TensorBuffer(x.shape, x.dtype);
	  var xBuf = backend.bufferSync(x);

	  var _loop = function _loop(i) {
	    var outLoc = outBuf.indexToLoc(i);
	    var inLoc = outLoc.slice();
	    $dims.forEach(function (d) {
	      return inLoc[d] = x.shape[d] - 1 - inLoc[d];
	    });
	    outBuf.set.apply(outBuf, [xBuf.get.apply(xBuf, inLoc)].concat(outLoc));
	  };

	  for (var i = 0; i < outBuf.size; i++) {
	    _loop(i);
	  }

	  return backend.makeTensorInfo(outBuf.shape, outBuf.dtype, outBuf.values);
	}