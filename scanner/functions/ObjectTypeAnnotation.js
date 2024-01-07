function ObjectTypeAnnotation(node) {
	  var _this = this;

	  if (node.exact) {
	    this.token("{|");
	  } else {
	    this.token("{");
	  }

	  var props = node.properties.concat(node.callProperties, node.indexers);

	  if (props.length) {
	    this.space();

	    this.printJoin(props, node, {
	      addNewlines: function addNewlines(leading) {
	        if (leading && !props[0]) return 1;
	      },

	      indent: true,
	      statement: true,
	      iterator: function iterator() {
	        if (props.length !== 1) {
	          if (_this.format.flowCommaSeparator) {
	            _this.token(",");
	          } else {
	            _this.semicolon();
	          }
	          _this.space();
	        }
	      }
	    });

	    this.space();
	  }

	  if (node.exact) {
	    this.token("|}");
	  } else {
	    this.token("}");
	  }
	}