function NodeValueImpl(node, tensorMap, context) {
	    var _this = this;

	    this.node = node;
	    this.tensorMap = tensorMap;
	    this.context = context;
	    this.inputs = [];
	    this.attrs = {};
	    this.inputs = node.inputNames.map(function (name) {
	      return _this.getInput(name);
	    });

	    if (node.rawAttrs != null) {
	      this.attrs = Object.keys(node.rawAttrs).reduce(function (attrs, key) {
	        attrs[key] = _this.getAttr(key);
	        return attrs;
	      }, {});
	    }
	  }