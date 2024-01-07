function diag$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var x = inputs.x;
	  var outShape = [].concat(x.shape, x.shape);
	  var xSize = sizeFromShape(x.shape);
	  var flat = reshape$3({
	    inputs: {
	      x: x
	    },
	    backend: backend,
	    attrs: {
	      shape: [xSize]
	    }
	  });
	  var program = new DiagProgram(xSize);
	  var res = backend.runWebGLProgram(program, [flat], flat.dtype);
	  var out = reshape$3({
	    inputs: {
	      x: res
	    },
	    backend: backend,
	    attrs: {
	      shape: outShape
	    }
	  });
	  backend.disposeIntermediateTensorInfo(flat);
	  backend.disposeIntermediateTensorInfo(res);
	  return out;
	}