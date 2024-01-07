function TensorList(tensors, elementShape, elementDtype, maxNumElements) {
	    if (maxNumElements === void 0) {
	      maxNumElements = -1;
	    }

	    this.tensors = tensors;
	    this.elementShape = elementShape;
	    this.elementDtype = elementDtype;

	    if (tensors != null) {
	      tensors.forEach(function (tensor) {
	        if (elementDtype !== tensor.dtype) {
	          throw new Error("Invalid data types; op elements " + elementDtype + ", but list elements " + tensor.dtype);
	        }

	        assertShapesMatchAllowUndefinedSize(elementShape, tensor.shape, 'TensorList shape mismatch: ');
	        keep(tensor);
	      });
	    }

	    this.idTensor = scalar(0);
	    this.maxNumElements = maxNumElements;
	    keep(this.idTensor);
	  }