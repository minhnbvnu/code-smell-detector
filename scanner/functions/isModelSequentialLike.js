function isModelSequentialLike(model) {
	  var sequentialLike = true;
	  var nodesByDepth = [];
	  var nodes = [];

	  for (var depth in model.nodesByDepth) {
	    nodesByDepth.push(model.nodesByDepth[depth]);
	  }

	  for (var _i = 0, _nodesByDepth = nodesByDepth; _i < _nodesByDepth.length; _i++) {
	    var depthNodes = _nodesByDepth[_i];

	    if (depthNodes.length > 1 || depthNodes.length === 1 && depthNodes[0].inboundLayers.length > 1) {
	      sequentialLike = false;
	      break;
	    }

	    nodes.push.apply(nodes, depthNodes);
	  }

	  if (sequentialLike) {
	    // Search for shared layers.
	    for (var _iterator = _createForOfIteratorHelperLoose(model.layers), _step; !(_step = _iterator()).done;) {
	      var layer = _step.value;
	      var flag = false;

	      for (var _iterator2 = _createForOfIteratorHelperLoose(layer.inboundNodes), _step2; !(_step2 = _iterator2()).done;) {
	        var node = _step2.value;

	        if (nodes.indexOf(node) !== -1) {
	          if (flag) {
	            sequentialLike = false;
	            break;
	          } else {
	            flag = true;
	          }
	        }
	      }

	      if (!sequentialLike) {
	        break;
	      }
	    }
	  }

	  return sequentialLike;
	}