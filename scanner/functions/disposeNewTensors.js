function disposeNewTensors(tensors, refTensors) {
	  if (tensors == null) {
	    return;
	  }

	  var oldTensorIds = [];

	  if (refTensors instanceof Tensor) {
	    oldTensorIds.push(refTensors.id);
	  } else if (Array.isArray(refTensors)) {
	    refTensors.forEach(function (t) {
	      return oldTensorIds.push(t.id);
	    });
	  } else if (refTensors != null) {
	    // `oldTensors` is a map from string name to Tensor.
	    for (var name in refTensors) {
	      var oldTensor = refTensors[name];
	      oldTensorIds.push(oldTensor.id);
	    }
	  }

	  var tensorsToDispose = [];

	  if (tensors instanceof Tensor) {
	    if (oldTensorIds.indexOf(tensors.id) === -1) {
	      tensorsToDispose.push(tensors);
	    }
	  } else if (Array.isArray(tensors)) {
	    tensors.forEach(function (t) {
	      if (oldTensorIds.indexOf(t.id) === -1) {
	        tensorsToDispose.push(t);
	      }
	    });
	  } else if (tensors != null) {
	    // `oldTensors` is a map from string name to Tensor.
	    for (var _name in tensors) {
	      var tensor = tensors[_name];

	      if (oldTensorIds.indexOf(tensor.id) === -1) {
	        tensorsToDispose.push(tensor);
	      }
	    }
	  }

	  tensorsToDispose.forEach(function (t) {
	    if (!t.isDisposed) {
	      t.dispose();
	    }
	  });
	}