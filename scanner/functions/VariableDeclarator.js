function VariableDeclarator() {
	  var id = this.get("id");

	  if (id.isIdentifier()) {
	    return this.get("init").getTypeAnnotation();
	  } else {
	    return;
	  }
	}