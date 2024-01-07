function Container(args) {
	    var _this;

	    // No args passed to super's constructor.
	    _this = _Layer.call(this, {}) || this;
	    _this.containerNodes = new Set();
	    _this.name = args.name;

	    if (_this.name == null) {
	      var prefix = _this.getClassName().toLowerCase();

	      _this.name = getUid(prefix);
	    }

	    _this.supportsMasking = false;
	    _this.trainable_ = true; // TODO(michaelterry): Initialize perInputLosses/Updates here.
	    // Container-specific properties.

	    if (Array.isArray(args.inputs)) {
	      _this.inputs = args.inputs.slice();
	    } else {
	      _this.inputs = [args.inputs];
	    }

	    if (Array.isArray(args.outputs)) {
	      _this.outputs = args.outputs.slice();
	    } else {
	      _this.outputs = [args.outputs];
	    } // Check for redundancy in inputs.


	    if (unique$1(_this.inputs).length !== _this.inputs.length) {
	      throw new ValueError('The list of inputs passed to the model is ' + 'redundant. All inputs should only appear once. Found: ' + ("" + _this.inputs.map(function (x) {
	        return x.name;
	      })));
	    } // Check for redundancy in outputs.


	    if (unique$1(_this.outputs).length !== _this.outputs.length) {
	      console.warn('The list of outputs passed to the model is redundant. ' + 'All outputs should only appear once. Found: ' + ("" + _this.outputs.map(function (x) {
	        return x.name;
	      })));
	    }
	    /*
	      List of initial layers (1 to 1 mapping with this.inputs, hence the same
	      layer might appear twice)
	    */


	    _this.inputLayers = [];
	    _this.inputLayersNodeIndices = [];
	    _this.inputLayersTensorIndices = [];
	    /*
	      List of layers (1 to 1 mapping with this.outputs, hence the same layer
	      might appear twice)
	    */

	    _this.outputLayers = [];
	    _this.outputLayersNodeIndices = [];
	    _this.outputLayersTensorIndices = [];
	    /*
	      All layers in order of horizontal graph traversal. Entries are unique.
	      Includes input and output layers.
	    */

	    _this.layers = [];
	    /*
	      References to container layers that were constructed internally. We need
	      these to properly dispose of tensors from nested containers.
	    */

	    _this.internalContainerRefs = []; // TODO(michaelterry): Determine if caching still needed with eager
	    // backend.

	    /*
	      This is for performance optimization when calling the Container on new
	      inputs. Every time the Container is called on a set on input tensors,
	      we compute the output tensors, output masks and output shapes in one pass,
	      then cache them here. When one of these outputs is queried later,
	      we retrieve it from there instead of recomputing it.
	    */
	    // this.outputTensorCache = {};
	    // this.outputShapeCache = {};
	    // Build this.outputLayers:

	    for (var _iterator = _createForOfIteratorHelperLoose(_this.outputs), _step; !(_step = _iterator()).done;) {
	      var x = _step.value;
	      var _layer2 = x.sourceLayer;
	      var nodeIndex = x.nodeIndex;
	      var tensorIndex = x.tensorIndex;

	      _this.outputLayers.push(_layer2);

	      _this.outputLayersNodeIndices.push(nodeIndex);

	      _this.outputLayersTensorIndices.push(tensorIndex);
	    } // TODO(michaelterry): Add output mask cache code.
	    // Build this.inputLayers:


	    for (var _iterator2 = _createForOfIteratorHelperLoose(_this.inputs), _step2; !(_step2 = _iterator2()).done;) {
	      var _x = _step2.value;
	      var _layer3 = _x.sourceLayer;
	      var _nodeIndex2 = _x.nodeIndex;
	      var _tensorIndex2 = _x.tensorIndex;
	      /*
	        It's supposed to be an input layer, so only one node
	        and one tensor output.
	      */

	      assert$1(_nodeIndex2 === 0, 'input layer has >1 nodes');
	      assert$1(_tensorIndex2 === 0, 'input layer has >1 tensors');

	      _this.inputLayers.push(_layer3);

	      _this.inputLayersNodeIndices.push(_nodeIndex2);

	      _this.inputLayersTensorIndices.push(_tensorIndex2);
	    } // Build this.inputNames and this.outputNames.


	    _this.inputNames = [];
	    _this.outputNames = [];
	    _this.feedInputShapes = [];
	    _this.feedInputNames = [];
	    _this.feedOutputNames = [];

	    for (var i = 0; i < _this.inputLayers.length; i++) {
	      var layer = _this.inputLayers[i]; // Check that layer is an InputLayer.

	      if (!(layer instanceof InputLayer)) {
	        throw new TypeError('Input layers to a LayersModel must be InputLayer objects. ' + ("Received inputs: " + args.inputs + ". ") + ("Input " + i + " (0-based) originates ") + ("from layer type " + layer.getClassName() + "."));
	      }

	      _this.inputNames.push(layer.name);

	      _this.feedInputShapes.push(layer.batchInputShape);

	      _this.feedInputNames.push(layer.name);
	    }

	    for (var _iterator3 = _createForOfIteratorHelperLoose(_this.outputLayers), _step3; !(_step3 = _iterator3()).done;) {
	      var _layer4 = _step3.value;

	      _this.outputNames.push(_layer4.name);
	    }

	    _this.internalInputShapes = _this.inputs.map(function (x) {
	      return x.shape;
	    });
	    _this.internalOutputShapes = _this.outputs.map(function (x) {
	      return x.shape;
	    });
	    /*
	      Container_nodes: set of nodes included in the graph (not all nodes
	      included in the layers are relevant to the current graph).
	    */
	    // ids of all nodes relevant to the Container:

	    var nodesDepths = {}; // To recover nodes from their ID.

	    var nodeIDToNode = {};
	    var layersDepths = {}; // To layers from their ID.

	    var layerIDToLayer = {};
	    var layerIndices = {};
	    var nodesInDecreasingDepth = [];
	    /**
	     * Builds a map of the graph of layers.
	     *
	     * This recursively updates the map `layerIndices`,
	     * the list `nodesInDecreasingDepth` and the set `containerNodes`.
	     *
	     * @param tensor Some tensor in a graph.
	     * @param finishedNodes Set of nodes whose subgraphs have been traversed
	     *         completely. Useful to prevent duplicated work.
	     * @param nodesInProgress Set of nodes that are currently active on the
	     *         recursion stack. Useful to detect cycles.
	     * @param layer Layer from which `tensor` comes from. If not provided,
	     *   will be obtained from tensor.sourceLayer.
	     * @param nodeIndex Node index from which `tensor` comes from.
	     * @param tensorIndex TensorIndex from which `tensor` comes from.
	     *
	     * @exception RuntimeError if a cycle is detected.
	     */

	    var buildMapOfGraph = function buildMapOfGraph(tensor, finishedNodes, nodesInProgress, layer, nodeIndex, tensorIndex) {
	      if (layer == null || nodeIndex == null || tensorIndex == null) {
	        layer = tensor.sourceLayer;
	        nodeIndex = tensor.nodeIndex;
	        tensorIndex = tensor.tensorIndex;
	      }

	      var node = layer.inboundNodes[nodeIndex]; // Prevent cycles.

	      if (nodesInProgress.indexOf(node) !== -1) {
	        throw new RuntimeError("The tensor " + tensor.name + " at layer \"" + layer.name + "\" " + 'is part of a cycle.');
	      } // Don't repeat work for shared subgraphs


	      if (finishedNodes.indexOf(node) !== -1) {
	        return;
	      } // Update containerNodes.


	      _this.containerNodes.add(Container.nodeKey(layer, nodeIndex)); // Store the traversal order for layer sorting.


	      if (!(layer.id in layerIndices)) {
	        layerIndices[layer.id] = Object.keys(layerIndices).length;
	      }

	      if (nodesInProgress.indexOf(node) === -1) {
	        nodesInProgress.push(node);
	      } // Propagate to all previous tensors connected to this node.


	      var numInboundLayers = node.inboundLayers.length;

	      for (var _i = 0; _i < numInboundLayers; _i++) {
	        var x = node.inputTensors[_i];
	        var _layer = node.inboundLayers[_i];
	        var _nodeIndex = node.nodeIndices[_i];
	        var _tensorIndex = node.tensorIndices[_i];
	        buildMapOfGraph(x, finishedNodes, nodesInProgress, _layer, _nodeIndex, _tensorIndex);
	      }

	      finishedNodes.push(node);

	      while (nodesInProgress.indexOf(node) >= 0) {
	        nodesInProgress.splice(nodesInProgress.indexOf(node), 1);
	      }

	      nodesInDecreasingDepth.push(node);
	    };

	    var finishedNodes = [];
	    var nodesInProgress = [];

	    for (var _iterator4 = _createForOfIteratorHelperLoose(_this.outputs), _step4; !(_step4 = _iterator4()).done;) {
	      var _x2 = _step4.value;
	      buildMapOfGraph(_x2, finishedNodes, nodesInProgress);
	    }

	    var reversedNodesInDecreasingDepth = nodesInDecreasingDepth.slice().reverse();

	    for (var _iterator5 = _createForOfIteratorHelperLoose(reversedNodesInDecreasingDepth), _step5; !(_step5 = _iterator5()).done;) {
	      var node = _step5.value;
	      nodeIDToNode[node.id] = node; // If the depth is not set, the node has no outbound nodes (depth 0).

	      if (!(node.id in nodesDepths)) {
	        nodesDepths[node.id] = 0;
	      }

	      var _depth2 = nodesDepths[node.id]; // Update the depth of the corresponding layer

	      var previousDepth = layersDepths[node.outboundLayer.id] == null ? 0 : layersDepths[node.outboundLayer.id];
	      /*
	        If we've seen this layer before at a higher depth, we should use that
	        depth instead of the node depth.  This is necessary for shared layers
	        that have inputs at different depth levels in the graph.
	      */

	      _depth2 = Math.max(_depth2, previousDepth);
	      layersDepths[node.outboundLayer.id] = _depth2;
	      layerIDToLayer[node.outboundLayer.id] = node.outboundLayer;
	      nodesDepths[node.id] = _depth2; // Update the depth of inbound nodes.

	      for (var _i2 = 0; _i2 < node.inboundLayers.length; _i2++) {
	        var inboundLayer = node.inboundLayers[_i2];
	        var _nodeIndex3 = node.nodeIndices[_i2];
	        var inboundNode = inboundLayer.inboundNodes[_nodeIndex3];

	        var _previousDepth = nodesDepths[inboundNode.id] == null ? 0 : nodesDepths[inboundNode.id];

	        nodesDepths[inboundNode.id] = Math.max(_depth2 + 1, _previousDepth);
	        nodeIDToNode[inboundNode.id] = inboundNode;
	      }
	    } // Build a dict {depth: list of nodes with this depth}


	    var nodesByDepth = {};

	    for (var nodeID in nodesDepths) {
	      var depth = nodesDepths[nodeID];

	      if (!(depth in nodesByDepth)) {
	        nodesByDepth[depth] = [];
	      }

	      nodesByDepth[depth].push(nodeIDToNode[nodeID]);
	    } // Build a dict {depth: list of layers with this depth}


	    var layersByDepth = {};

	    for (var layerID in layersDepths) {
	      var _depth = layersDepths[layerID];

	      if (!(_depth in layersByDepth)) {
	        layersByDepth[_depth] = [];
	      }

	      layersByDepth[_depth].push(layerIDToLayer[layerID]);
	    } // Get sorted list of layer depths.


	    var depthKeys = Object.keys(layersByDepth).map(function (x) {
	      return parseInt(x, 10);
	    }).sort(reverseNumberCompare); // Set this.layers and this.layersByDepth.

	    _this.layers = [];

	    for (var _iterator6 = _createForOfIteratorHelperLoose(depthKeys), _step6; !(_step6 = _iterator6()).done;) {
	      var _depth3 = _step6.value;
	      var layersForDepth = layersByDepth[_depth3]; // Container.layers needs to have a deterministic order:
	      // here we order them by traversal order.

	      layersForDepth.sort(function (a, b) {
	        var aIndex = layerIndices[a.id];
	        var bIndex = layerIndices[b.id];

	        if (aIndex < bIndex) {
	          return -1;
	        }

	        if (aIndex > bIndex) {
	          return 1;
	        }

	        return 0;
	      });

	      for (var _iterator9 = _createForOfIteratorHelperLoose(layersForDepth), _step9; !(_step9 = _iterator9()).done;) {
	        var _layer5 = _step9.value;

	        if (_layer5 instanceof Container) {
	          _this.internalContainerRefs.push(_layer5);
	        }

	        _this.layers.push(_layer5);
	      }
	    }

	    _this.layersByDepth = layersByDepth; // Get sorted list of node depths;

	    depthKeys = Object.keys(nodesByDepth).map(function (x) {
	      return parseInt(x, 10);
	    }).sort(reverseNumberCompare); // Check that all tensors required are computable.
	    // computable_tensors: all tensors in the graph
	    // that can be computed from the inputs provided.

	    var computableTensors = _this.inputs.slice(); // To provide a better error msg.


	    var layersWithCompleteInput = [];

	    for (var _iterator7 = _createForOfIteratorHelperLoose(depthKeys), _step7; !(_step7 = _iterator7()).done;) {
	      var _depth4 = _step7.value;

	      for (var _iterator10 = _createForOfIteratorHelperLoose(nodesByDepth[_depth4]), _step10; !(_step10 = _iterator10()).done;) {
	        var _node = _step10.value;
	        var _layer6 = _node.outboundLayer;

	        if (_layer6 != null) {
	          for (var _iterator11 = _createForOfIteratorHelperLoose(_node.inputTensors), _step11; !(_step11 = _iterator11()).done;) {
	            var _x3 = _step11.value;

	            if (computableTensors.indexOf(_x3) === -1) {
	              throw new RuntimeError("Graph disconnected: cannot obtain value for tensor " + _x3 + (" at layer \"" + _layer6.name + "\". ") + 'The following previous layers were accessed without ' + ("issue: " + layersWithCompleteInput));
	            }
	          }

	          for (var _iterator12 = _createForOfIteratorHelperLoose(_node.outputTensors), _step12; !(_step12 = _iterator12()).done;) {
	            var _x4 = _step12.value;
	            computableTensors.push(_x4);
	          }

	          layersWithCompleteInput.push(_layer6.name);
	        }
	      }
	    } // Set this.containerNodes and this.nodesByDepth.


	    _this.nodesByDepth = nodesByDepth; // Ensure name unicity, which will be crucial for serialization
	    // (since serialized nodes refer to layers by their name).

	    var allNames = _this.layers.map(function (x) {
	      return x.name;
	    });

	    var _loop = function _loop() {
	      var name = _step8.value;
	      var numOccurrences = allNames.filter(function (x) {
	        return x === name;
	      }).length;

	      if (numOccurrences !== 1) {
	        throw new RuntimeError("The name \"" + name + "\" is used " + numOccurrences + " times " + 'in the model. All layer names should be unique. Layer names: ' + JSON.stringify(allNames));
	      }
	    };

	    for (var _iterator8 = _createForOfIteratorHelperLoose(allNames), _step8; !(_step8 = _iterator8()).done;) {
	      _loop();
	    } // Layer parameters.
	    // The new container starts with a single inbound node
	    // for its inputs, and no outbound nodes.
	    // Will be appended to by future calls to apply().


	    _this.outboundNodes = []; // Will be appended to below, and by future calls to apply().

	    _this.inboundNodes = []; // Create the node linking internal inputs to internal outputs.
	    // (This call has side effects.)
	    // tslint:disable-next-line:no-unused-expression

	    new Node({
	      outboundLayer: _assertThisInitialized(_this),
	      inboundLayers: [],
	      nodeIndices: [],
	      tensorIndices: [],
	      inputTensors: _this.inputs,
	      outputTensors: _this.outputs,
	      inputMasks: _this.inputs.map(function (x) {
	        return null;
	      }),
	      outputMasks: _this.outputs.map(function (x) {
	        return null;
	      }),
	      inputShapes: _this.inputs.map(function (x) {
	        return x.shape;
	      }),
	      outputShapes: _this.outputs.map(function (x) {
	        return x.shape;
	      })
	    });
	    _this.built = true;
	    _this._refCount = 1; // The ref count of a container always start at 1.

	    return _this;
	  }