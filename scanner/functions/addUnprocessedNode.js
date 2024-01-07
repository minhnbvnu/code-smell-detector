function addUnprocessedNode(layer, nodeData) {
	      if (!(layer.name in unprocessedNodes)) {
	        unprocessedNodes[layer.name] = [nodeData];
	      } else {
	        unprocessedNodes[layer.name].push(nodeData);
	      }
	    }