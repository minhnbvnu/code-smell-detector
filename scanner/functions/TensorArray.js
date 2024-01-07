function TensorArray(name, dtype, maxSize, elementShape, identicalElementShapes, dynamicSize, clearAfterRead) {
	    this.name = name;
	    this.dtype = dtype;
	    this.maxSize = maxSize;
	    this.elementShape = elementShape;
	    this.identicalElementShapes = identicalElementShapes;
	    this.dynamicSize = dynamicSize;
	    this.clearAfterRead = clearAfterRead;
	    this.tensors = [];
	    this.closed_ = false;
	    this.idTensor = scalar(0);
	    keep(this.idTensor);
	  }