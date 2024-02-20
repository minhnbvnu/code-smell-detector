function LSTM(args) {
	    if (args.implementation === 0) {
	      console.warn('`implementation=0` has been deprecated, and now defaults to ' + '`implementation=1`. Please update your layer call.');
	    }

	    args.cell = new LSTMCell(args);
	    return _RNN3.call(this, args) || this; // TODO(cais): Add activityRegularizer.
	  }