function generateDropoutMask(args) {
	  var ones = args.ones,
	      rate = args.rate,
	      _args$training = args.training,
	      training = _args$training === void 0 ? false : _args$training,
	      _args$count = args.count,
	      count = _args$count === void 0 ? 1 : _args$count;

	  var droppedInputs = function droppedInputs() {
	    return dropout$1(ones(), rate);
	  };

	  var createMask = function createMask() {
	    return inTrainPhase(droppedInputs, ones, training);
	  }; // just in case count is provided with null or undefined


	  if (!count || count <= 1) {
	    return keep(createMask().clone());
	  }

	  var masks = Array(count).fill(undefined).map(createMask);
	  return masks.map(function (m) {
	    return keep(m.clone());
	  });
	}