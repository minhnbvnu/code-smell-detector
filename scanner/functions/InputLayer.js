function InputLayer(args) {
	    var _this;

	    _this = _Layer.call(this, {
	      dtype: args.dtype,
	      name: args.name != null ? args.name : getUid('input').toString()
	    }) || this; // Normalize config.batchSize and config.sparse

	    if (args.batchSize == null) {
	      args.batchSize = null;
	    }

	    if (args.sparse == null) {
	      args.sparse = false;
	    }

	    _this.trainable = false;
	    _this.built = true;
	    _this.sparse = args.sparse;

	    if (args.inputShape != null && args.batchInputShape != null) {
	      throw new ValueError('Only provide the inputShape OR ' + 'batchInputShape argument to inputLayer, not both at the same time.');
	    }

	    var batchInputShape = args.batchInputShape;

	    if (batchInputShape == null) {
	      if (args.inputShape == null) {
	        throw new ValueError('An InputLayer should be passed either a ' + '`batchInputShape` or an `inputShape`.');
	      } else {
	        batchInputShape = [args.batchSize].concat(args.inputShape);
	      }
	    } else {
	      // TODO(michaelterry): Backport to PyKeras
	      if (args.batchSize != null) {
	        throw new ValueError('Cannot specify batchSize if batchInputShape is ' + 'specified when creating an InputLayer.');
	      }
	    }

	    var dtype = args.dtype || 'float32';
	    _this.batchInputShape = batchInputShape;
	    _this.dtype = dtype; // TODO(michaelterry): Backport this to PyKeras?

	    _this.inputSpec = [{
	      shape: batchInputShape
	    }];
	    var inputTensor = new SymbolicTensor(_this.dtype, _this.batchInputShape, _assertThisInitialized(_this), [], {}, _this.name);
	    inputTensor.nodeIndex = 0;
	    inputTensor.tensorIndex = 0; // Create an input node to add to this.outboundNode.
	    // (This call has side effects.)
	    // tslint:disable-next-line:no-unused-expression

	    new Node({
	      outboundLayer: _assertThisInitialized(_this),
	      inboundLayers: [],
	      nodeIndices: [],
	      tensorIndices: [],
	      inputTensors: [inputTensor],
	      outputTensors: [inputTensor],
	      inputMasks: [null],
	      outputMasks: [null],
	      inputShapes: [batchInputShape],
	      outputShapes: [batchInputShape]
	    });
	    return _this;
	  }