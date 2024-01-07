function getObjRef(node, nodes, file, scope) {
	  var ref = void 0;
	  if (t.isSuper(node)) {
	    return node;
	  } else if (t.isIdentifier(node)) {
	    if (scope.hasBinding(node.name)) {
	      return node;
	    } else {
	      ref = node;
	    }
	  } else if (t.isMemberExpression(node)) {
	    ref = node.object;

	    if (t.isSuper(ref) || t.isIdentifier(ref) && scope.hasBinding(ref.name)) {
	      return ref;
	    }
	  } else {
	    throw new Error("We can't explode this node type " + node.type);
	  }

	  var temp = scope.generateUidIdentifierBasedOnNode(ref);
	  nodes.push(t.variableDeclaration("var", [t.variableDeclarator(temp, ref)]));
	  return temp;
	}