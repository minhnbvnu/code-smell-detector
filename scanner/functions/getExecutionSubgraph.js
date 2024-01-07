function getExecutionSubgraph(inputs, outputs, weightMap, initNodes) {
	  var usedNodes = new Set();
	  var missingInputs = [];
	  var dynamicNode = null;
	  var syncInputs = null; // Start with the outputs, going backwards and find all the nodes that are
	  // needed to compute those outputs.

	  var seen = new Set();
	  var inputNodeNames = Object.keys(inputs).map(function (name) {
	    return parseNodeName(name)[0];
	  });
	  var initNodeNames = [];

	  if (initNodes != null) {
	    initNodeNames = initNodes.map(function (node) {
	      return parseNodeName(node.name)[0];
	    });
	  }

	  var frontier = [].concat(outputs);

	  while (frontier.length > 0) {
	    var node = frontier.pop();

	    if (isControlFlow(node) || isDynamicShape(node) || isHashTable(node)) {
	      if (dynamicNode == null) {
	        dynamicNode = node;
	        syncInputs = dynamicNode.children.map(function (child) {
	          return child.name;
	        }).filter(function (name) {
	          return usedNodes.has(name);
	        });
	      }
	    }

	    usedNodes.add(node.name); // Weights are dead end since we already have their values.

	    if (weightMap[node.name] != null) {
	      continue;
	    } // This node is a dead end since it's one of the user-provided inputs.


	    if (inputNodeNames.indexOf(node.name) !== -1) {
	      continue;
	    } // This node is a dead end since it doesn't have any inputs.


	    if (initNodeNames.indexOf(node.name) !== -1) {
	      continue;
	    }

	    if (node.inputs.length === 0) {
	      missingInputs.push(node.name);
	      continue;
	    }

	    node.inputs.forEach(function (input) {
	      // Don't add to the frontier if it is already there.
	      if (seen.has(input.name)) {
	        return;
	      }

	      seen.add(input.name);
	      frontier.push(input);
	    });
	  }

	  return {
	    inputs: inputs,
	    outputs: outputs,
	    usedNodes: usedNodes,
	    missingInputs: missingInputs,
	    dynamicNode: dynamicNode,
	    syncInputs: syncInputs
	  };
	}