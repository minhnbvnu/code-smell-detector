function getNodesInTopologicalOrder(graph, weightMap, executionInfo) {
	  var usedNodes = executionInfo.usedNodes,
	      inputs = executionInfo.inputs;
	  var frontier = [];
	  var inputNodes = Object.keys(inputs).map(function (name) {
	    return parseNodeName(name)[0];
	  }).map(function (name) {
	    return graph.nodes[name];
	  });
	  var initNodes = graph.initNodes;
	  inputNodes.forEach(function (input) {
	    if (usedNodes.has(input.name)) {
	      frontier.push(input);
	    }
	  });
	  graph.weights.forEach(function (weight) {
	    if (usedNodes.has(weight.name)) {
	      frontier.push(weight);
	    }
	  });

	  if (initNodes != null) {
	    initNodes.forEach(function (node) {
	      if (usedNodes.has(node.name)) {
	        frontier.push(node);
	      }
	    });
	  }

	  var seen = new Set();
	  var orderedNodes = [];

	  while (frontier.length > 0) {
	    var node = frontier.pop();
	    seen.add(node.name);

	    if (!weightMap[node.name]) {
	      orderedNodes.push(node);
	    }

	    node.children.forEach(function (child) {
	      if (!seen.has(child.name) && usedNodes.has(child.name) && child.inputs.every(function (input) {
	        return seen.has(input.name);
	      })) {
	        frontier.push(child);
	      }
	    });
	  }

	  return orderedNodes;
	}