function complex$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var real = inputs.real,
	      imag = inputs.imag;
	  var complexInfo = backend.makeTensorInfo(real.shape, 'complex64');
	  var complex = backend.texData.get(complexInfo.dataId);
	  var realTensorInfo = identity$2({
	    inputs: {
	      x: real
	    },
	    backend: backend
	  });
	  var realData = backend.texData.get(realTensorInfo.dataId);
	  realData.complexParentRefCount++;
	  var imagTensorInfo = identity$2({
	    inputs: {
	      x: imag
	    },
	    backend: backend
	  });
	  var imagData = backend.texData.get(imagTensorInfo.dataId);
	  imagData.complexParentRefCount++;
	  complex.complexTensorInfos = {
	    real: realTensorInfo,
	    imag: imagTensorInfo
	  };
	  return complexInfo;
	}