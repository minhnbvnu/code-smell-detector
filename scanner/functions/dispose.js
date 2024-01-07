function dispose(container) {
	  var tensors = getTensorsInContainer(container);
	  tensors.forEach(function (tensor) {
	    return tensor.dispose();
	  });
	}