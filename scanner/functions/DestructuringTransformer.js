function DestructuringTransformer(opts) {
	      (0, _classCallCheck3.default)(this, DestructuringTransformer);

	      this.blockHoist = opts.blockHoist;
	      this.operator = opts.operator;
	      this.arrays = {};
	      this.nodes = opts.nodes || [];
	      this.scope = opts.scope;
	      this.file = opts.file;
	      this.kind = opts.kind;
	    }