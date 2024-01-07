function _params(node) {
	  var _this = this;

	  this.print(node.typeParameters, node);
	  this.token("(");
	  this.printList(node.params, node, {
	    iterator: function iterator(node) {
	      if (node.optional) _this.token("?");
	      _this.print(node.typeAnnotation, node);
	    }
	  });
	  this.token(")");

	  if (node.returnType) {
	    this.print(node.returnType, node);
	  }
	}