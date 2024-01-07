function PathHoister(path, scope) {
	    (0, _classCallCheck3.default)(this, PathHoister);

	    this.breakOnScopePaths = [];

	    this.bindings = {};

	    this.scopes = [];

	    this.scope = scope;
	    this.path = path;

	    this.attachAfter = false;
	  }