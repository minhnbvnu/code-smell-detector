function split$3(tensor, length, elementShape) {
	  var totalLength = 0;
	  var cumulativeLengths = length.map(function (len) {
	    totalLength += len;
	    return totalLength;
	  });

	  if (totalLength !== tensor.shape[0]) {
	    throw new Error("Expected sum of lengths to be equal to\n          tensor.shape[0], but sum of lengths is\n        " + totalLength + ", and tensor's shape is: " + tensor.shape);
	  }

	  var elementPerRow = totalLength === 0 ? 0 : tensor.size / totalLength;
	  var tensors = tidy(function () {
	    var tensors = [];
	    tensor = reshape(tensor, [1, totalLength, elementPerRow]);

	    for (var i = 0; i < length.length; ++i) {
	      var previousLength = i === 0 ? 0 : cumulativeLengths[i - 1];
	      var indices = [0, previousLength, 0];
	      var sizes = [1, length[i], elementPerRow];
	      tensors[i] = reshape(slice$2(tensor, indices, sizes), elementShape);
	    }

	    tensor.dispose();
	    return tensors;
	  });
	  var list = new TensorList([], elementShape, tensor.dtype, length.length);

	  for (var i = 0; i < tensors.length; i++) {
	    list.setItem(i, tensors[i]);
	  }

	  return list;
	}