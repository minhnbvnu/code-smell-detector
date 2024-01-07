function fftImpl(input, inverse, cpuBackend) {
	  var inputSize = sizeFromShape(input.shape);
	  var inputVals = cpuBackend.data.get(input.dataId);
	  var realVals = cpuBackend.data.get(inputVals.complexTensorInfos.real.dataId).values;
	  var imagVals = cpuBackend.data.get(inputVals.complexTensorInfos.imag.dataId).values;

	  if (isExponentOf2(inputSize)) {
	    var result = fftRadix2(realVals, imagVals, inputSize, inverse, cpuBackend);
	    var resultShape = [input.shape[0], input.shape[1]];

	    if (inverse) {
	      var realInfo = cpuBackend.makeTensorInfo(resultShape, 'float32', result.real);
	      var imagInfo = cpuBackend.makeTensorInfo(resultShape, 'float32', result.imag);
	      var sizeInfo = cpuBackend.makeTensorInfo([], 'float32', createScalarValue(inputSize, 'float32'));
	      var sizeInfoCopy = identity$1({
	        inputs: {
	          x: sizeInfo
	        },
	        backend: cpuBackend
	      });
	      var divRealInfo = realDivConfig.kernelFunc({
	        inputs: {
	          a: realInfo,
	          b: sizeInfo
	        },
	        backend: cpuBackend
	      });
	      var divImagInfo = realDivConfig.kernelFunc({
	        inputs: {
	          a: imagInfo,
	          b: sizeInfoCopy
	        },
	        backend: cpuBackend
	      });
	      var divRealVals = cpuBackend.data.get(divRealInfo.dataId).values;
	      var divImagVals = cpuBackend.data.get(divImagInfo.dataId).values;
	      cpuBackend.disposeIntermediateTensorInfo(realInfo);
	      cpuBackend.disposeIntermediateTensorInfo(imagInfo);
	      cpuBackend.disposeIntermediateTensorInfo(sizeInfo);
	      cpuBackend.disposeIntermediateTensorInfo(sizeInfoCopy);
	      cpuBackend.disposeIntermediateTensorInfo(divRealInfo);
	      cpuBackend.disposeIntermediateTensorInfo(divImagInfo);
	      return {
	        real: divRealVals,
	        imag: divImagVals
	      };
	    }

	    return result;
	  } else {
	    var data = mergeRealAndImagArrays(realVals, imagVals);
	    var rawOutput = fourierTransformByMatmul(data, inputSize, inverse);
	    return splitRealAndImagArrays(rawOutput);
	  }
	}