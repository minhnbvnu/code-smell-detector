function BlockScoping(loopPath, blockPath, parent, scope, file) {
	    (0, _classCallCheck3.default)(this, BlockScoping);

	    this.parent = parent;
	    this.scope = scope;
	    this.file = file;

	    this.blockPath = blockPath;
	    this.block = blockPath.node;

	    this.outsideLetReferences = (0, _create2.default)(null);
	    this.hasLetReferences = false;
	    this.letReferences = (0, _create2.default)(null);
	    this.body = [];

	    if (loopPath) {
	      this.loopParent = loopPath.parent;
	      this.loopLabel = t.isLabeledStatement(this.loopParent) && this.loopParent.label;
	      this.loopPath = loopPath;
	      this.loop = loopPath.node;
	    }
	  }