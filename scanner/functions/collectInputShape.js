function collectInputShape(inputTensors) {
	  inputTensors = toList(inputTensors);
	  var shapes = [];

	  for (var _iterator9 = _createForOfIteratorHelperLoose(inputTensors), _step9; !(_step9 = _iterator9()).done;) {
	    var x = _step9.value;
	    shapes.push(x.shape);
	  }

	  return singletonOrArray(shapes);
	}