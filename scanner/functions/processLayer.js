function processLayer(layerData) {
	      var layerName = layerData['name']; // Instantiate layer.

	      var layer = deserialize$1(layerData, config['customObjects'] != null ? config['customObjects'] : {});
	      layer.setFastWeightInitDuringBuild(fastWeightInit);
	      createdLayers[layerName] = layer; // Gather layer inputs.

	      var inboundNodesData = layerData['inboundNodes'];
	      inboundNodesData.forEach(function (nodeData) {
	        if (!(nodeData instanceof Array)) {
	          throw new ValueError("Corrupted configuration, expected array for nodeData: " + nodeData);
	        } // We don't process nodes (i.e. make layer calls)
	        // on the fly because the inbound node may not yet exist,
	        // in case of layer shared at different topological depths
	        // (e.g.a model such as A(B(A(B(x)))))


	        addUnprocessedNode(layer, nodeData);
	      });
	    }