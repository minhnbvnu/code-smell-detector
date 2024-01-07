function loose(path, file) {
	    var node = path.node,
	        scope = path.scope,
	        parent = path.parent;
	    var left = node.left;

	    var declar = void 0,
	        id = void 0;

	    if (t.isIdentifier(left) || t.isPattern(left) || t.isMemberExpression(left)) {
	      id = left;
	    } else if (t.isVariableDeclaration(left)) {
	      id = scope.generateUidIdentifier("ref");
	      declar = t.variableDeclaration(left.kind, [t.variableDeclarator(left.declarations[0].id, id)]);
	    } else {
	      throw file.buildCodeFrameError(left, messages.get("unknownForHead", left.type));
	    }

	    var iteratorKey = scope.generateUidIdentifier("iterator");
	    var isArrayKey = scope.generateUidIdentifier("isArray");

	    var loop = buildForOfLoose({
	      LOOP_OBJECT: iteratorKey,
	      IS_ARRAY: isArrayKey,
	      OBJECT: node.right,
	      INDEX: scope.generateUidIdentifier("i"),
	      ID: id
	    });

	    if (!declar) {
	      loop.body.body.shift();
	    }

	    var isLabeledParent = t.isLabeledStatement(parent);
	    var labeled = void 0;

	    if (isLabeledParent) {
	      labeled = t.labeledStatement(parent.label, loop);
	    }

	    return {
	      replaceParent: isLabeledParent,
	      declar: declar,
	      node: labeled || loop,
	      loop: loop
	    };
	  }