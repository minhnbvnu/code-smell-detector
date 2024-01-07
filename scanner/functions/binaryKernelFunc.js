function binaryKernelFunc(name, simpleImpl, complexImpl, dtype) {
	  if (complexImpl == null) {
	    return function (_ref) {
	      var inputs = _ref.inputs,
	          backend = _ref.backend;
	      var a = inputs.a,
	          b = inputs.b;
	      var cpuBackend = backend;
	      assertNotComplex([a, b], name);
	      var aVals = cpuBackend.data.get(a.dataId).values;
	      var bVals = cpuBackend.data.get(b.dataId).values;
	      var $dtype = dtype || a.dtype;

	      var _simpleImpl = simpleImpl(a.shape, b.shape, aVals, bVals, $dtype),
	          resultData = _simpleImpl[0],
	          resultShape = _simpleImpl[1];

	      return cpuBackend.makeTensorInfo(resultShape, $dtype, resultData);
	    };
	  }

	  return function (_ref2) {
	    var inputs = _ref2.inputs,
	        backend = _ref2.backend;
	    var a = inputs.a,
	        b = inputs.b;
	    var cpuBackend = backend;

	    if (a.dtype === 'complex64' || b.dtype === 'complex64') {
	      var $aComplex = cast$2({
	        inputs: {
	          x: a
	        },
	        backend: cpuBackend,
	        attrs: {
	          dtype: 'complex64'
	        }
	      });
	      var $aComplexVals = cpuBackend.data.get($aComplex.dataId);
	      var aReal = $aComplexVals.complexTensorInfos.real;
	      var aImag = $aComplexVals.complexTensorInfos.imag;
	      var aRealVals = cpuBackend.data.get(aReal.dataId).values;
	      var aImagVals = cpuBackend.data.get(aImag.dataId).values;
	      var $bComplex = cast$2({
	        inputs: {
	          x: b
	        },
	        backend: cpuBackend,
	        attrs: {
	          dtype: 'complex64'
	        }
	      });
	      var $bComplexVals = cpuBackend.data.get($bComplex.dataId);
	      var bReal = $bComplexVals.complexTensorInfos.real;
	      var bImag = $bComplexVals.complexTensorInfos.imag;
	      var bRealVals = cpuBackend.data.get(bReal.dataId).values;
	      var bImagVals = cpuBackend.data.get(bImag.dataId).values;

	      var _complexImpl = complexImpl(a.shape, b.shape, aRealVals, aImagVals, bRealVals, bImagVals),
	          resultRealData = _complexImpl[0],
	          resultImagData = _complexImpl[1],
	          resultShape = _complexImpl[2];

	      var resultReal = cpuBackend.makeTensorInfo(resultShape, 'float32', resultRealData);
	      var resultImag = cpuBackend.makeTensorInfo(resultShape, 'float32', resultImagData);
	      var result = complex$1({
	        inputs: {
	          real: resultReal,
	          imag: resultImag
	        },
	        backend: cpuBackend
	      });
	      cpuBackend.disposeIntermediateTensorInfo($aComplex);
	      cpuBackend.disposeIntermediateTensorInfo($bComplex);
	      cpuBackend.disposeIntermediateTensorInfo(resultReal);
	      cpuBackend.disposeIntermediateTensorInfo(resultImag);
	      return result;
	    } else {
	      var aVals = cpuBackend.data.get(a.dataId).values;
	      var bVals = cpuBackend.data.get(b.dataId).values;
	      var $dtype = dtype || a.dtype;

	      var _simpleImpl2 = simpleImpl(a.shape, b.shape, aVals, bVals, $dtype),
	          resultData = _simpleImpl2[0],
	          _resultShape = _simpleImpl2[1];

	      return cpuBackend.makeTensorInfo(_resultShape, $dtype, resultData);
	    }
	  };
	}