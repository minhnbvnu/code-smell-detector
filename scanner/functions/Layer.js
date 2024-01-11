function Layer(args) {
	    var _this;

	    if (args === void 0) {
	      args = {};
	    }

	    _this = _serialization$Serial.call(this) || this;
	    _this._callHook = null;
	    _this._addedWeightNames = []; // Porting Notes: PyKeras does not have this property in this base Layer
	    //   class. Instead lets Layer subclass set it dynamically and checks the
	    //   value with `hasattr`. In tfjs-layers, we let this be a member of this
	    //   base class.

	    _this._stateful = false;
	    _this.id = _nextLayerID++;
	    _this.activityRegularizer = null;
	    _this.inputSpec = null;
	    _this.supportsMasking = false; // These properties will be set upon call of this.build()

	    _this._trainableWeights = [];
	    _this._nonTrainableWeights = [];
	    _this._losses = [];
	    _this._updates = [];
	    _this._built = false;
	    /*
	      These lists will be filled via successive calls
	      to this.addInboundNode().
	     */

	    _this.inboundNodes = [];
	    _this.outboundNodes = [];
	    var name = args.name;

	    if (!name) {
	      var prefix = _this.getClassName();

	      name = toSnakeCase(prefix) + '_' + getUid(prefix);
	    }

	    _this.name = name;
	    _this.trainable_ = args.trainable == null ? true : args.trainable;

	    if (args.inputShape != null || args.batchInputShape != null) {
	      /*
	        In this case we will later create an input layer
	        to insert before the current layer
	       */
	      var batchInputShape;

	      if (args.batchInputShape != null) {
	        batchInputShape = args.batchInputShape;
	      } else if (args.inputShape != null) {
	        var batchSize = null;

	        if (args.batchSize != null) {
	          batchSize = args.batchSize;
	        }

	        batchInputShape = [batchSize].concat(args.inputShape);
	      }

	      _this.batchInputShape = batchInputShape; // Set dtype.

	      var dtype = args.dtype;

	      if (dtype == null) {
	        dtype = args.inputDType;
	      }

	      if (dtype == null) {
	        dtype = 'float32';
	      }

	      _this.dtype = dtype;
	    }

	    if (args.weights != null) {
	      _this.initialWeights = args.weights;
	    } else {
	      _this.initialWeights = null;
	    } // The value of `_refCount` is initialized to null. When the layer is used
	    // in a symbolic way for the first time, it will be set to 1.


	    _this._refCount = null;
	    _this.fastWeightInitDuringBuild = false;
	    return _this;
	  }