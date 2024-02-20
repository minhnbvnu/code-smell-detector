function Bidirectional(args) {
	    var _this4;

	    _this4 = _Wrapper2.call(this, args) || this; // Note: When creating `this.forwardLayer`, the original Layer object
	    //   (`config.layer`) ought to be cloned. This is why we call
	    //   `getConfig()` followed by `deserialize()`. Without this cloning,
	    //   the layer names saved during serialization will incorrectly contain
	    //   the 'forward_' prefix. In Python Keras, this is done using
	    //   `copy.copy` (shallow copy), which does not have a simple equivalent
	    //   in JavaScript. JavaScript's `Object.assign()` does not copy
	    //   methods.

	    var layerConfig = args.layer.getConfig();
	    var forwDict = {};
	    forwDict['className'] = args.layer.getClassName();
	    forwDict['config'] = layerConfig;
	    _this4.forwardLayer = deserialize$1(forwDict);
	    layerConfig['goBackwards'] = layerConfig['goBackwards'] === true ? false : true;
	    var backDict = {};
	    backDict['className'] = args.layer.getClassName();
	    backDict['config'] = layerConfig;
	    _this4.backwardLayer = deserialize$1(backDict);
	    _this4.forwardLayer.name = 'forward_' + _this4.forwardLayer.name;
	    _this4.backwardLayer.name = 'backward_' + _this4.backwardLayer.name;
	    _this4.mergeMode = args.mergeMode === undefined ? DEFAULT_BIDIRECTIONAL_MERGE_MODE : args.mergeMode;
	    checkBidirectionalMergeMode(_this4.mergeMode);

	    if (args.weights) {
	      throw new NotImplementedError('weights support is not implemented for Bidirectional layer yet.');
	    }

	    _this4._stateful = args.layer.stateful;
	    _this4.returnSequences = args.layer.returnSequences;
	    _this4.returnState = args.layer.returnState;
	    _this4.supportsMasking = true;
	    _this4._trainable = true;
	    _this4.inputSpec = args.layer.inputSpec;
	    _this4.numConstants = null;
	    return _this4;
	  }