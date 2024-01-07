function MetaProperty(node) {
	  this.print(node.meta, node);
	  this.token(".");
	  this.print(node.property, node);
	}