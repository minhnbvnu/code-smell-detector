function IntersectionTypeAnnotation(node) {
	  this.printJoin(node.types, node, { separator: andSeparator });
	}