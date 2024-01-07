function ReplaceSupers(opts) {
	    var inClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    (0, _classCallCheck3.default)(this, ReplaceSupers);

	    this.forceSuperMemoisation = opts.forceSuperMemoisation;
	    this.methodPath = opts.methodPath;
	    this.methodNode = opts.methodNode;
	    this.superRef = opts.superRef;
	    this.isStatic = opts.isStatic;
	    this.hasSuper = false;
	    this.inClass = inClass;
	    this.isLoose = opts.isLoose;
	    this.scope = this.methodPath.scope;
	    this.file = opts.file;
	    this.opts = opts;

	    this.bareSupers = [];
	    this.returns = [];
	    this.thises = [];
	  }