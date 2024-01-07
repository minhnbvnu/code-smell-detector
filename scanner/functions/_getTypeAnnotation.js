function _getTypeAnnotation() {
	  var node = this.node;

	  if (!node) {
	    if (this.key === "init" && this.parentPath.isVariableDeclarator()) {
	      var declar = this.parentPath.parentPath;
	      var declarParent = declar.parentPath;

	      if (declar.key === "left" && declarParent.isForInStatement()) {
	        return t.stringTypeAnnotation();
	      }

	      if (declar.key === "left" && declarParent.isForOfStatement()) {
	        return t.anyTypeAnnotation();
	      }

	      return t.voidTypeAnnotation();
	    } else {
	      return;
	    }
	  }

	  if (node.typeAnnotation) {
	    return node.typeAnnotation;
	  }

	  var inferer = inferers[node.type];
	  if (inferer) {
	    return inferer.call(this, node);
	  }

	  inferer = inferers[this.parentPath.type];
	  if (inferer && inferer.validParent) {
	    return this.parentPath.getTypeAnnotation();
	  }
	}