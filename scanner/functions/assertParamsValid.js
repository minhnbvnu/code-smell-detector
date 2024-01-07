function assertParamsValid(input, begin, size) {
	  var inputRank = input.shape.length;
	  assert(inputRank === begin.length, function () {
	    return "Error in slice" + inputRank + "D: Length of begin " + begin + " must " + ("match the rank of the array (" + inputRank + ").");
	  });
	  assert(inputRank === size.length, function () {
	    return "Error in slice" + inputRank + "D: Length of size " + size + " must " + ("match the rank of the array (" + inputRank + ").");
	  });

	  var _loop = function _loop(i) {
	    assert(begin[i] + size[i] <= input.shape[i], function () {
	      return "Error in slice" + inputRank + "D: begin[" + i + "] + size[" + i + "] " + ("(" + (begin[i] + size[i]) + ") would overflow input.shape[" + i + "] (" + input.shape[i] + ")");
	    });
	  };

	  for (var i = 0; i < inputRank; ++i) {
	    _loop(i);
	  }
	}