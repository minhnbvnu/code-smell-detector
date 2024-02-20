function Sequential(args) {
	    var _this;

	    _this = _LayersModel.call(this, {
	      inputs: [],
	      outputs: []
	    }) || this;
	    args = args || {};
	    _this.trainable = true;
	    _this.built = false; // Set model name.

	    _this.name = args.name != null ? args.name : getUid('sequential_'); // Add to the model any layers passed to the constructor.

	    if (args.layers != null) {
	      for (var _iterator = _createForOfIteratorHelperLoose(args.layers), _step; !(_step = _iterator()).done;) {
	        var layer = _step.value;

	        _this.add(layer);
	      }
	    }

	    return _this;
	  }