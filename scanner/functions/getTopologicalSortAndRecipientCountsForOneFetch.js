function getTopologicalSortAndRecipientCountsForOneFetch(fetch, feedDict) {
	  var visited = new Set();
	  var sorted = [];
	  var recipientMap = {}; // Put keys of the feedDict into visited first, so they don't have to be
	  // walked. This is needed in case where there are feeds for intermediate
	  // SymbolicTensors of the graph.

	  for (var _iterator6 = _createForOfIteratorHelperLoose(feedDict.names()), _step6; !(_step6 = _iterator6()).done;) {
	    var key = _step6.value;
	    visited.add(key);
	  }

	  var stack = [];
	  var marks = []; // Initial population of stack and marks.

	  stack.push(fetch);

	  while (stack.length > 0) {
	    var top = stack[stack.length - 1];

	    if (visited.has(top.name)) {
	      stack.pop();
	      continue;
	    }

	    var topIsMarked = marks[marks.length - 1] === stack.length - 1;

	    if (top.inputs.length === 0 || topIsMarked) {
	      // Input SymbolicTensor or all children have been visited.
	      stack.pop();
	      sorted.push(top);
	      visited.add(top.name);

	      if (topIsMarked) {
	        marks.pop();
	      }
	    } else {
	      // A non-input SymbolicTensor whose upstream SymbolicTensors haven't
	      // been visited yet. Push them onto the stack.
	      marks.push(stack.length - 1);

	      for (var _iterator7 = _createForOfIteratorHelperLoose(top.inputs), _step7; !(_step7 = _iterator7()).done;) {
	        var input = _step7.value;

	        // Increment the recipient count. Note that this needs to happen
	        // regardless of whether the SymbolicTensor has been visited before.
	        if (recipientMap[input.name] == null) {
	          recipientMap[input.name] = new Set();
	        }

	        recipientMap[input.name].add(top.name);

	        if (visited.has(input.name)) {
	          continue; // Avoid repeated visits to the same SymbolicTensor.
	        }

	        stack.push(input);
	      }
	    }
	  }

	  return {
	    sorted: sorted,
	    recipientMap: recipientMap
	  };
	}