function Scope(path, parentScope) {
	    (0, _classCallCheck3.default)(this, Scope);

	    if (parentScope && parentScope.block === path.node) {
	      return parentScope;
	    }

	    var cached = getCache(path, parentScope, this);
	    if (cached) return cached;

	    this.uid = uid++;
	    this.parent = parentScope;
	    this.hub = path.hub;

	    this.parentBlock = path.parent;
	    this.block = path.node;
	    this.path = path;

	    this.labels = new _map2.default();
	  }