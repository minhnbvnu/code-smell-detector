function processNode(layer, nodeData) {
	      var inputTensors = [];
	      var kwargs;

	      for (var _iterator27 = _createForOfIteratorHelperLoose(nodeData), _step27; !(_step27 = _iterator27()).done;) {
	        var inputData = _step27.value;
	        var inboundLayerName = inputData[0];
	        var inboundNodeIndex = inputData[1];
	        var inboundTensorIndex = inputData[2];
	        kwargs = inputData[3] == null ? {} : inputData[3];

	        if (!(inboundLayerName in createdLayers)) {
	          addUnprocessedNode(layer, nodeData);
	          return;
	        }

	        var inboundLayer = createdLayers[inboundLayerName];

	        if (inboundLayer.inboundNodes.length <= inboundNodeIndex) {
	          addUnprocessedNode(layer, nodeData);
	          return;
	        }

	        var inboundNode = inboundLayer.inboundNodes[inboundNodeIndex];
	        inputTensors.push(inboundNode.outputTensors[inboundTensorIndex]);
	      } // Call layer on its inputs, thus creating the node
	      // and building the layer if needed.
	      // Note: This has Eager vs Graph Implications.


	      if (inputTensors.length > 0) {
	        layer.apply(singletonOrArray(inputTensors), kwargs); // was ** kwargs
	      }
	    }