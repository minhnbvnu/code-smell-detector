function TemplateElement(node, parent) {
	  var isFirst = parent.quasis[0] === node;
	  var isLast = parent.quasis[parent.quasis.length - 1] === node;

	  var value = (isFirst ? "`" : "}") + node.value.raw + (isLast ? "`" : "${");

	  this.token(value);
	}