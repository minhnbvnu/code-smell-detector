function ConvRNN2D(args) {
	    var _this;

	    if (args.unroll) {
	      throw new NotImplementedError('Unrolling is not possible with convolutional RNNs.');
	    }

	    if (Array.isArray(args.cell)) {
	      throw new NotImplementedError('It is not possible at the moment to stack convolutional cells.');
	    }

	    _this = _RNN.call(this, args) || this;
	    _this.inputSpec = [new InputSpec({
	      ndim: 5
	    })];
	    return _this;
	  }