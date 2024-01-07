function getNodeOutputs(fetch) {
	  var layerOutputs;

	  if (fetch.sourceLayer.inboundNodes.length === 1) {
	    layerOutputs = fetch.sourceLayer.output;
	  } else {
	    var nodeIndex = null;

	    for (var i = 0; i < fetch.sourceLayer.inboundNodes.length; ++i) {
	      for (var _iterator8 = _createForOfIteratorHelperLoose(fetch.sourceLayer.inboundNodes[i].outputTensors), _step8; !(_step8 = _iterator8()).done;) {
	        var outputTensor = _step8.value;

	        if (outputTensor.id === fetch.id) {
	          nodeIndex = i;
	          break;
	        }
	      }
	    }

	    layerOutputs = fetch.sourceLayer.getOutputAt(nodeIndex);
	  }

	  return layerOutputs;
	}