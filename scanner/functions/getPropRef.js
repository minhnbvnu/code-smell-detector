function getPropRef(node, nodes, file, scope) {
	  var prop = node.property;
	  var key = t.toComputedKey(node, prop);
	  if (t.isLiteral(key) && t.isPureish(key)) return key;

	  var temp = scope.generateUidIdentifierBasedOnNode(prop);
	  nodes.push(t.variableDeclaration("var", [t.variableDeclarator(temp, prop)]));
	  return temp;
	}