function printLayerSummaryWithConnections(layer, positions, relevantNodes, // tslint:disable-next-line:no-any
	printFn) {
	  var outputShape;

	  try {
	    outputShape = JSON.stringify(layer.outputShape);
	  } catch (err) {
	    outputShape = 'multiple';
	  }

	  var connections = [];

	  for (var _iterator3 = _createForOfIteratorHelperLoose(layer.inboundNodes), _step3; !(_step3 = _iterator3()).done;) {
	    var node = _step3.value;

	    if (relevantNodes != null && relevantNodes.length > 0 && relevantNodes.indexOf(node) === -1) {
	      continue;
	    }

	    for (var _i2 = 0; _i2 < node.inboundLayers.length; ++_i2) {
	      var inboundLayer = node.inboundLayers[_i2].name;
	      var inboundLayerIndex = node.nodeIndices[_i2];
	      var inboundTensorIndex = node.tensorIndices[_i2];
	      connections.push(inboundLayer + "[" + inboundLayerIndex + "][" + inboundTensorIndex + "]");
	    }
	  }

	  var name = layer.name;
	  var className = layer.getClassName();
	  var firstConnection = connections.length === 0 ? '' : connections[0];
	  var fields = [name + " (" + className + ")", outputShape, layer.countParams().toString(), firstConnection];
	  printRow(fields, positions, printFn);

	  for (var i = 1; i < connections.length; ++i) {
	    printRow(['', '', '', connections[i]], positions, printFn);
	  }
	}