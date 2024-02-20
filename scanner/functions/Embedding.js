function Embedding(args) {
	    var _this;

	    _this = _Layer.call(this, args) || this;
	    _this.embeddings = null;
	    _this.DEFAULT_EMBEDDINGS_INITIALIZER = 'randomUniform';

	    if (args.batchInputShape == null && args.inputShape == null) {
	      // Porting Note: This logic is copied from Layer's constructor, since we
	      // can't do exactly what the Python constructor does for Embedding().
	      // Specifically, the super constructor can not be called after the
	      // mutation of the `config` argument.
	      var batchSize = null;

	      if (args.batchSize != null) {
	        batchSize = args.batchSize;
	      }

	      if (args.inputLength == null) {
	        // Fix super-constructor to what it would have done if
	        // 'config.inputShape' were (None, )
	        _this.batchInputShape = [batchSize, null];
	      } else {
	        // Fix super-constructor to what it would have done if
	        // 'config.inputShape' were (config.inputLength, )
	        _this.batchInputShape = [batchSize].concat(toList(args.inputLength));
	      }
	    }

	    _this.inputDim = args.inputDim;
	    assertPositiveInteger(_this.inputDim, 'inputDim');
	    _this.outputDim = args.outputDim;
	    assertPositiveInteger(_this.outputDim, 'outputDim');
	    _this.embeddingsInitializer = getInitializer(args.embeddingsInitializer || _this.DEFAULT_EMBEDDINGS_INITIALIZER);
	    _this.embeddingsRegularizer = getRegularizer(args.embeddingsRegularizer);
	    _this.activityRegularizer = getRegularizer(args.activityRegularizer);
	    _this.embeddingsConstraint = getConstraint(args.embeddingsConstraint);
	    _this.maskZero = args.maskZero;
	    _this.supportsMasking = args.maskZero;
	    _this.inputLength = args.inputLength;
	    return _this;
	  }