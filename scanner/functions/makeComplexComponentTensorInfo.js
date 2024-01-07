function makeComplexComponentTensorInfo(complexTensor, complexPart) {
	  return {
	    dataId: complexPart.dataId,
	    dtype: complexPart.dtype,
	    shape: complexTensor.shape
	  };
	}