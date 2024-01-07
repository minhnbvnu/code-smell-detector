function TraversalContext(scope, opts, state, parentPath) {
	    (0, _classCallCheck3.default)(this, TraversalContext);
	    this.queue = null;

	    this.parentPath = parentPath;
	    this.scope = scope;
	    this.state = state;
	    this.opts = opts;
	  }