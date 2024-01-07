function CustomCallback(args, yieldEvery) {
	    var _this3;

	    _this3 = _BaseCallback3.call(this) || this;
	    _this3.currentEpoch = 0;
	    _this3.yieldEvery = yieldEvery || 'auto';

	    if (_this3.yieldEvery === 'auto') {
	      _this3.yieldEvery = DEFAULT_YIELD_EVERY_MS;
	    }

	    if (_this3.yieldEvery === 'never' && args.onYield != null) {
	      throw new Error('yieldEvery is `never` but you provided an `onYield` callback. ' + 'Either change `yieldEvery` or remove the callback');
	    }

	    if (isNumber(_this3.yieldEvery)) {
	      // Decorate `maybeWait` so it will be called at most once every
	      // `yieldEvery` ms.
	      _this3.maybeWait = debounce(_this3.maybeWait.bind(_assertThisInitialized(_this3)), _this3.yieldEvery);
	    }

	    _this3.trainBegin = args.onTrainBegin;
	    _this3.trainEnd = args.onTrainEnd;
	    _this3.epochBegin = args.onEpochBegin;
	    _this3.epochEnd = args.onEpochEnd;
	    _this3.batchBegin = args.onBatchBegin;
	    _this3.batchEnd = args.onBatchEnd;
	    _this3.yield = args.onYield;
	    return _this3;
	  }