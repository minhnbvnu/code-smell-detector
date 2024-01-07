function buildChildren(node) {
	  var elems = [];

	  for (var i = 0; i < node.children.length; i++) {
	    var child = node.children[i];

	    if (t.isJSXText(child)) {
	      cleanJSXElementLiteralChild(child, elems);
	      continue;
	    }

	    if (t.isJSXExpressionContainer(child)) child = child.expression;
	    if (t.isJSXEmptyExpression(child)) continue;

	    elems.push(child);
	  }

	  return elems;
	}