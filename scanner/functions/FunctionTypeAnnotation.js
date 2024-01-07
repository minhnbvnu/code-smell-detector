function FunctionTypeAnnotation(node, parent) {
	  this.print(node.typeParameters, node);
	  this.token("(");
	  this.printList(node.params, node);

	  if (node.rest) {
	    if (node.params.length) {
	      this.token(",");
	      this.space();
	    }
	    this.token("...");
	    this.print(node.rest, node);
	  }

	  this.token(")");

	  if (parent.type === "ObjectTypeCallProperty" || parent.type === "DeclareFunction") {
	    this.token(":");
	  } else {
	    this.space();
	    this.token("=>");
	  }

	  this.space();
	  this.print(node.returnType, node);
	}