function Node(args, // TODO(michaelterry): Define actual type for this.
	  callArgs) {
	    this.callArgs = callArgs;
	    this.id = _nextNodeID++;
	    /*
	      Layer instance (NOT a list).
	      this is the layer that takes a list of input tensors
	      and turns them into a list of output tensors.
	      the current node will be added to
	      the inboundNodes of outboundLayer.
	    */

	    this.outboundLayer = args.outboundLayer;
	    /*
	        The following 3 properties describe where
	        the input tensors come from: which layers,
	        and for each layer, which node and which
	        tensor output of each node.
	    */
	    // List of layer instances.

	    this.inboundLayers = args.inboundLayers; // List of integers, 1:1 mapping with inboundLayers.

	    this.nodeIndices = args.nodeIndices; // List of integers, 1:1 mapping with inboundLayers.

	    this.tensorIndices = args.tensorIndices;
	    /*
	        Following 2 properties:
	        tensor inputs and outputs of outboundLayer.
	    */
	    // List of tensors. 1:1 mapping with inboundLayers.

	    this.inputTensors = args.inputTensors; // List of tensors, created by outboundLayer.call().

	    this.outputTensors = args.outputTensors;
	    /*
	        Following 2 properties: input and output masks.
	        List of tensors, 1:1 mapping with inputTensor.
	    */

	    this.inputMasks = args.inputMasks; // List of tensors, created by outboundLayer.computeMask().

	    this.outputMasks = args.outputMasks; // Following 2 properties: input and output shapes.
	    // List of shape tuples, shapes of inputTensors.

	    this.inputShapes = args.inputShapes; // List of shape tuples, shapes of outputTensors.

	    this.outputShapes = args.outputShapes; // Add nodes to all layers involved.

	    for (var _iterator = _createForOfIteratorHelperLoose(args.inboundLayers), _step; !(_step = _iterator()).done;) {
	      var layer = _step.value;

	      if (layer != null) {
	        layer.outboundNodes.push(this);
	      }
	    }

	    args.outboundLayer.inboundNodes.push(this);
	  }