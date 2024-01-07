function complex$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var real = inputs.real,
	      imag = inputs.imag;
	  var realVals = backend.data.get(real.dataId).values;
	  var imagVals = backend.data.get(imag.dataId).values;
	  var complexInfo = backend.makeTensorInfo(real.shape, 'complex64');
	  var complex = backend.data.get(complexInfo.dataId); // The complex tensor owns the underlying real and imag tensorInfos, only the
	  // complex tensor tracks refCount, when complexData is disposed the
	  // underlying tensorData will be disposed.

	  complex.complexTensorInfos = {
	    real: backend.makeTensorInfo(real.shape, 'float32', realVals),
	    imag: backend.makeTensorInfo(imag.shape, 'float32', imagVals)
	  };
	  return complexInfo;
	}