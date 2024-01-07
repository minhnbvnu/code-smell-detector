function batchMatMul$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var a = inputs.a,
	      b = inputs.b;
	  var transposeA = attrs.transposeA,
	      transposeB = attrs.transposeB;
	  return batchMatMulImpl({
	    a: a,
	    b: b,
	    transposeA: transposeA,
	    transposeB: transposeB,
	    backend: backend
	  });
	}