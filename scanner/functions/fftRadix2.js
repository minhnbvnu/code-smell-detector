function fftRadix2(realVals, imagVals, size, inverse, cpuBackend) {
	  if (size === 1) {
	    return {
	      real: realVals,
	      imag: imagVals
	    };
	  }

	  var data = mergeRealAndImagArrays(realVals, imagVals);
	  var half = size / 2;
	  var evenComplex = complexWithEvenIndex(data);
	  var evenRealVals = evenComplex.real;
	  var evenImagVals = evenComplex.imag;
	  var evenShape = [evenRealVals.length];
	  var evenRealInfo = cpuBackend.makeTensorInfo(evenShape, 'float32', evenRealVals);
	  var evenImagInfo = cpuBackend.makeTensorInfo(evenShape, 'float32', evenImagVals);
	  var evenTensorInfo = complex$1({
	    inputs: {
	      real: evenRealInfo,
	      imag: evenImagInfo
	    },
	    backend: cpuBackend
	  });
	  var oddComplex = complexWithOddIndex(data);
	  var oddRealVals = oddComplex.real;
	  var oddImagVals = oddComplex.imag;
	  var oddShape = [oddRealVals.length];
	  var oddRealInfo = cpuBackend.makeTensorInfo(oddShape, 'float32', oddRealVals);
	  var oddImagInfo = cpuBackend.makeTensorInfo(oddShape, 'float32', oddImagVals);
	  var oddTensorInfo = complex$1({
	    inputs: {
	      real: oddRealInfo,
	      imag: oddImagInfo
	    },
	    backend: cpuBackend
	  }); // Recursive call for half part of original input.

	  var $evenComplex = fftRadix2(evenRealVals, evenImagVals, half, inverse, cpuBackend);
	  var $evenRealVals = $evenComplex.real;
	  var $evenImagVals = $evenComplex.imag;
	  var $evenShape = [$evenRealVals.length];
	  var $evenRealInfo = cpuBackend.makeTensorInfo($evenShape, 'float32', $evenRealVals);
	  var $evenImagInfo = cpuBackend.makeTensorInfo($evenShape, 'float32', $evenImagVals);
	  var $evenTensorInfo = complex$1({
	    inputs: {
	      real: $evenRealInfo,
	      imag: $evenImagInfo
	    },
	    backend: cpuBackend
	  });
	  var $oddComplex = fftRadix2(oddRealVals, oddImagVals, half, inverse, cpuBackend);
	  var $oddRealVals = $oddComplex.real;
	  var $oddImagVals = $oddComplex.imag;
	  var $oddShape = [$oddRealVals.length];
	  var $oddRealInfo = cpuBackend.makeTensorInfo($oddShape, 'float32', $oddRealVals);
	  var $oddImagInfo = cpuBackend.makeTensorInfo($oddShape, 'float32', $oddImagVals);
	  var $oddTensorInfo = complex$1({
	    inputs: {
	      real: $oddRealInfo,
	      imag: $oddImagInfo
	    },
	    backend: cpuBackend
	  });
	  var e = exponents(size, inverse);
	  var eShape = [e.real.length];
	  var eRealInfo = cpuBackend.makeTensorInfo(eShape, 'float32', e.real);
	  var eImagInfo = cpuBackend.makeTensorInfo(eShape, 'float32', e.imag);
	  var complexInfo = complex$1({
	    inputs: {
	      real: eRealInfo,
	      imag: eImagInfo
	    },
	    backend: cpuBackend
	  });
	  var exponentInfo = multiply$2({
	    inputs: {
	      a: complexInfo,
	      b: $oddTensorInfo
	    },
	    backend: cpuBackend
	  });
	  var addPart = add$4({
	    inputs: {
	      a: $evenTensorInfo,
	      b: exponentInfo
	    },
	    backend: cpuBackend
	  });
	  var subPart = sub$1({
	    inputs: {
	      a: $evenTensorInfo,
	      b: exponentInfo
	    },
	    backend: cpuBackend
	  });
	  var addPartReal = real$1({
	    inputs: {
	      input: addPart
	    },
	    backend: cpuBackend
	  });
	  var subPartReal = real$1({
	    inputs: {
	      input: subPart
	    },
	    backend: cpuBackend
	  });
	  var addPartImag = imag$1({
	    inputs: {
	      input: addPart
	    },
	    backend: cpuBackend
	  });
	  var subPartImag = imag$1({
	    inputs: {
	      input: subPart
	    },
	    backend: cpuBackend
	  });
	  var $real = concat$1({
	    inputs: [addPartReal, subPartReal],
	    backend: cpuBackend,
	    attrs: {
	      axis: 0
	    }
	  });
	  var $imag = concat$1({
	    inputs: [addPartImag, subPartImag],
	    backend: cpuBackend,
	    attrs: {
	      axis: 0
	    }
	  });
	  var $realVals = cpuBackend.data.get($real.dataId).values;
	  var $imagVals = cpuBackend.data.get($imag.dataId).values;
	  cpuBackend.disposeIntermediateTensorInfo(evenRealInfo);
	  cpuBackend.disposeIntermediateTensorInfo(evenImagInfo);
	  cpuBackend.disposeIntermediateTensorInfo(evenTensorInfo);
	  cpuBackend.disposeIntermediateTensorInfo(oddRealInfo);
	  cpuBackend.disposeIntermediateTensorInfo(oddImagInfo);
	  cpuBackend.disposeIntermediateTensorInfo(oddTensorInfo);
	  cpuBackend.disposeIntermediateTensorInfo($evenRealInfo);
	  cpuBackend.disposeIntermediateTensorInfo($evenImagInfo);
	  cpuBackend.disposeIntermediateTensorInfo($evenTensorInfo);
	  cpuBackend.disposeIntermediateTensorInfo($oddRealInfo);
	  cpuBackend.disposeIntermediateTensorInfo($oddImagInfo);
	  cpuBackend.disposeIntermediateTensorInfo($oddTensorInfo);
	  cpuBackend.disposeIntermediateTensorInfo(eRealInfo);
	  cpuBackend.disposeIntermediateTensorInfo(eImagInfo);
	  cpuBackend.disposeIntermediateTensorInfo(complexInfo);
	  cpuBackend.disposeIntermediateTensorInfo(exponentInfo);
	  cpuBackend.disposeIntermediateTensorInfo(addPart);
	  cpuBackend.disposeIntermediateTensorInfo(subPart);
	  cpuBackend.disposeIntermediateTensorInfo(addPartReal);
	  cpuBackend.disposeIntermediateTensorInfo(addPartImag);
	  cpuBackend.disposeIntermediateTensorInfo(subPartReal);
	  cpuBackend.disposeIntermediateTensorInfo(subPartImag);
	  cpuBackend.disposeIntermediateTensorInfo($real);
	  cpuBackend.disposeIntermediateTensorInfo($imag);
	  return {
	    real: $realVals,
	    imag: $imagVals
	  };
	}