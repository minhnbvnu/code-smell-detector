function multiRNNCell_(lstmCells, data, c, h) {
	  var $data = convertToTensor(data, 'data', 'multiRNNCell');
	  var $c = convertToTensorArray(c, 'c', 'multiRNNCell');
	  var $h = convertToTensorArray(h, 'h', 'multiRNNCell');
	  var input = $data;
	  var newStates = [];

	  for (var i = 0; i < lstmCells.length; i++) {
	    var output = lstmCells[i](input, $c[i], $h[i]);
	    newStates.push(output[0]);
	    newStates.push(output[1]);
	    input = output[1];
	  }

	  var newC = [];
	  var newH = [];

	  for (var _i = 0; _i < newStates.length; _i += 2) {
	    newC.push(newStates[_i]);
	    newH.push(newStates[_i + 1]);
	  }

	  return [newC, newH];
	}