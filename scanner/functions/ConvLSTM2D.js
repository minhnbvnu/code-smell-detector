function ConvLSTM2D(args) {
	    var cell = new ConvLSTM2DCell(args);
	    return _ConvRNN2D.call(this, Object.assign({}, args, {
	      cell: cell
	    })) || this;
	  }