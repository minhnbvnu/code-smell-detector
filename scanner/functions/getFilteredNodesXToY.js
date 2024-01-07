function getFilteredNodesXToY(tape, xs, y) {
	  // Forward pass to compute all the nodes and Tensors that are transitively a
	  // function of x.
	  var tensorsFromX = {};
	  var nodesFromX = {};

	  for (var i = 0; i < xs.length; i++) {
	    tensorsFromX[xs[i].id] = true;
	  }

	  for (var _i = 0; _i < tape.length; _i++) {
	    var node = tape[_i];
	    var nodeInputs = node.inputs;

	    for (var inputName in nodeInputs) {
	      var input = nodeInputs[inputName];
	      var anyInputFromX = false;

	      for (var j = 0; j < xs.length; j++) {
	        if (tensorsFromX[input.id]) {
	          node.outputs.forEach(function (output) {
	            return tensorsFromX[output.id] = true;
	          });
	          anyInputFromX = true;
	          nodesFromX[node.id] = true;
	          break;
	        }
	      }

	      if (anyInputFromX) {
	        break;
	      }
	    }
	  } // Backward pass to find all of the nodes and Tensors that lead to y.


	  var tensorsLeadToY = {};
	  tensorsLeadToY[y.id] = true;
	  var nodesToY = {};

	  for (var _i2 = tape.length - 1; _i2 >= 0; _i2--) {
	    var _node = tape[_i2];
	    var _nodeInputs = _node.inputs; // If any of the outputs lead to y, mark all of the inputs as leading to y.

	    for (var _j = 0; _j < _node.outputs.length; _j++) {
	      if (tensorsLeadToY[_node.outputs[_j].id]) {
	        for (var _inputName in _nodeInputs) {
	          tensorsLeadToY[_nodeInputs[_inputName].id] = true;
	          nodesToY[_node.id] = true;
	        }

	        break;
	      }
	    }
	  } // Return the paths that come from x and lead to y.


	  var filteredTape = [];

	  for (var _i3 = 0; _i3 < tape.length; _i3++) {
	    var _node2 = tape[_i3];

	    if (nodesFromX[_node2.id] && nodesToY[_node2.id]) {
	      // Prune the inputs from the node that aren't a function of x.
	      var prunedInputs = {};

	      for (var _inputName2 in _node2.inputs) {
	        var nodeInput = _node2.inputs[_inputName2];

	        if (tensorsFromX[nodeInput.id]) {
	          prunedInputs[_inputName2] = nodeInput;
	        }
	      } // Copy the node and overwrite inputsAndArgs to the pruned version.


	      var prunedNode = Object.assign({}, _node2);
	      prunedNode.inputs = prunedInputs;
	      prunedNode.outputs = _node2.outputs;
	      filteredTape.push(prunedNode);
	    }
	  }

	  return filteredTape;
	}