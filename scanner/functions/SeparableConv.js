function SeparableConv(rank, config) {
	    var _this8;

	    _this8 = _Conv3.call(this, rank, config) || this;
	    _this8.DEFAULT_DEPTHWISE_INITIALIZER = 'glorotUniform';
	    _this8.DEFAULT_POINTWISE_INITIALIZER = 'glorotUniform';
	    _this8.depthwiseKernel = null;
	    _this8.pointwiseKernel = null;

	    if (config.filters == null) {
	      throw new ValueError('The `filters` configuration field is required by SeparableConv, ' + 'but is unspecified.');
	    }

	    if (config.kernelInitializer != null || config.kernelRegularizer != null || config.kernelConstraint != null) {
	      throw new ValueError('Fields kernelInitializer, kernelRegularizer and kernelConstraint ' + 'are invalid for SeparableConv2D. Use depthwiseInitializer, ' + 'depthwiseRegularizer, depthwiseConstraint, pointwiseInitializer, ' + 'pointwiseRegularizer and pointwiseConstraint instead.');
	    }

	    if (config.padding != null && config.padding !== 'same' && config.padding !== 'valid') {
	      throw new ValueError("SeparableConv" + _this8.rank + "D supports only padding modes: " + ("'same' and 'valid', but received " + JSON.stringify(config.padding)));
	    }

	    _this8.depthMultiplier = config.depthMultiplier == null ? 1 : config.depthMultiplier;
	    _this8.depthwiseInitializer = getInitializer(config.depthwiseInitializer || _this8.DEFAULT_DEPTHWISE_INITIALIZER);
	    _this8.depthwiseRegularizer = getRegularizer(config.depthwiseRegularizer);
	    _this8.depthwiseConstraint = getConstraint(config.depthwiseConstraint);
	    _this8.pointwiseInitializer = getInitializer(config.depthwiseInitializer || _this8.DEFAULT_POINTWISE_INITIALIZER);
	    _this8.pointwiseRegularizer = getRegularizer(config.pointwiseRegularizer);
	    _this8.pointwiseConstraint = getConstraint(config.pointwiseConstraint);
	    return _this8;
	  }