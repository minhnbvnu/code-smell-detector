function EarlyStopping(args) {
	    var _this2;

	    _this2 = _Callback.call(this) || this;

	    if (args == null) {
	      args = {};
	    }

	    if (args.restoreBestWeights) {
	      throw new NotImplementedError('restoreBestWeights = True is not implemented in EarlyStopping yet.');
	    }

	    _this2.monitor = args.monitor || 'val_loss';
	    _this2.minDelta = Math.abs(args.minDelta || 0);
	    _this2.patience = args.patience || 0;
	    _this2.verbose = args.verbose || 0;
	    _this2.mode = args.mode || 'auto';
	    _this2.baseline = args.baseline;

	    if (['auto', 'min', 'max'].indexOf(_this2.mode) === -1) {
	      console.warn("EarlyStopping mode '" + _this2.mode + "' is invalid. " + "Falling back to mode 'auto'.");
	      _this2.mode = 'auto';
	    }

	    if (_this2.mode === 'min') {
	      _this2.monitorFunc = less$1;
	    } else if (_this2.mode === 'max') {
	      _this2.monitorFunc = greater$1;
	    } else {
	      // For mode === 'auto'.
	      if (_this2.monitor.indexOf('acc') !== -1) {
	        _this2.monitorFunc = greater$1;
	      } else {
	        _this2.monitorFunc = less$1;
	      }
	    }

	    if (_this2.monitorFunc === less$1) {
	      _this2.minDelta *= -1;
	    }

	    return _this2;
	  }