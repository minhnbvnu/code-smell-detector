function RNN(args) {
	    var _this;

	    _this = _Layer.call(this, args) || this;
	    var cell;

	    if (args.cell == null) {
	      throw new ValueError('cell property is missing for the constructor of RNN.');
	    } else if (Array.isArray(args.cell)) {
	      cell = new StackedRNNCells({
	        cells: args.cell
	      });
	    } else {
	      cell = args.cell;
	    }

	    if (cell.stateSize == null) {
	      throw new ValueError('The RNN cell should have an attribute `stateSize` (tuple of ' + 'integers, one integer per RNN state).');
	    }

	    _this.cell = cell;
	    _this.returnSequences = args.returnSequences == null ? false : args.returnSequences;
	    _this.returnState = args.returnState == null ? false : args.returnState;
	    _this.goBackwards = args.goBackwards == null ? false : args.goBackwards;
	    _this._stateful = args.stateful == null ? false : args.stateful;
	    _this.unroll = args.unroll == null ? false : args.unroll;
	    _this.supportsMasking = true;
	    _this.inputSpec = [new InputSpec({
	      ndim: 3
	    })];
	    _this.stateSpec = null;
	    _this.states_ = null; // TODO(cais): Add constantsSpec and numConstants.

	    _this.numConstants = null; // TODO(cais): Look into the use of initial_state in the kwargs of the
	    //   constructor.

	    _this.keptStates = [];
	    return _this;
	  }