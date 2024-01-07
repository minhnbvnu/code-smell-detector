function NodePath(hub, parent) {
	    (0, _classCallCheck3.default)(this, NodePath);

	    this.parent = parent;
	    this.hub = hub;
	    this.contexts = [];
	    this.data = {};
	    this.shouldSkip = false;
	    this.shouldStop = false;
	    this.removed = false;
	    this.state = null;
	    this.opts = null;
	    this.skipKeys = null;
	    this.parentPath = null;
	    this.context = null;
	    this.container = null;
	    this.listKey = null;
	    this.inList = false;
	    this.parentKey = null;
	    this.key = null;
	    this.node = null;
	    this.scope = null;
	    this.type = null;
	    this.typeAnnotation = null;
	  }