function JSXNamespacedName(node) {
	  this.print(node.namespace, node);
	  this.token(":");
	  this.print(node.name, node);
	}