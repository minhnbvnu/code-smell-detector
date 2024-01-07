function Binding(_ref) {
	    var existing = _ref.existing,
	        identifier = _ref.identifier,
	        scope = _ref.scope,
	        path = _ref.path,
	        kind = _ref.kind;
	    (0, _classCallCheck3.default)(this, Binding);

	    this.identifier = identifier;
	    this.scope = scope;
	    this.path = path;
	    this.kind = kind;

	    this.constantViolations = [];
	    this.constant = true;

	    this.referencePaths = [];
	    this.referenced = false;
	    this.references = 0;

	    this.clearValue();

	    if (existing) {
	      this.constantViolations = [].concat(existing.path, existing.constantViolations, this.constantViolations);
	    }
	  }