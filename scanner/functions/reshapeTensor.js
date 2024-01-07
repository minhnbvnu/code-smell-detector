function reshapeTensor(x, shape) {
	  return ENGINE.makeTensorFromDataId(x.dataId, shape, x.dtype);
	}