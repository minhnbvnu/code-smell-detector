function getSourceInputs(tensor, layer, nodeIndex) {
	  if (layer == null || nodeIndex != null && nodeIndex > 0) {
	    layer = tensor.sourceLayer;
	    nodeIndex = tensor.nodeIndex;
	  }

	  if (layer.inboundNodes.length === 0) {
	    return [tensor];
	  } else {
	    var node = layer.inboundNodes[nodeIndex];

	    if (node.inboundLayers.length === 0) {
	      return node.inputTensors;
	    } else {
	      var sourceTensors = [];

	      for (var i = 0; i < node.inboundLayers.length; i++) {
	        var x = node.inputTensors[i];
	        var _layer = node.inboundLayers[i];
	        var _nodeIndex = node.nodeIndices[i];
	        var previousSources = getSourceInputs(x, _layer, _nodeIndex); // Avoid input redundancy.

	        for (var _iterator10 = _createForOfIteratorHelperLoose(previousSources), _step10; !(_step10 = _iterator10()).done;) {
	          var _x = _step10.value;

	          if (sourceTensors.indexOf(_x) === -1) {
	            sourceTensors.push(_x);
	          }
	        }
	      }

	      return sourceTensors;
	    }
	  }
	}