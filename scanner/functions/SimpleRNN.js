function SimpleRNN(args) {
	    args.cell = new SimpleRNNCell(args);
	    return _RNN.call(this, args) || this; // TODO(cais): Add activityRegularizer.
	  }