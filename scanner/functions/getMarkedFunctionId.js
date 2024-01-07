function getMarkedFunctionId(funPath) {
	  var node = funPath.node;
	  t.assertIdentifier(node.id);

	  var blockPath = funPath.findParent(function (path) {
	    return path.isProgram() || path.isBlockStatement();
	  });

	  if (!blockPath) {
	    return node.id;
	  }

	  var block = blockPath.node;
	  _assert2.default.ok(Array.isArray(block.body));

	  var info = getMarkInfo(block);
	  if (!info.decl) {
	    info.decl = t.variableDeclaration("var", []);
	    blockPath.unshiftContainer("body", info.decl);
	    info.declPath = blockPath.get("body.0");
	  }

	  _assert2.default.strictEqual(info.declPath.node, info.decl);

	  // Get a new unique identifier for our marked variable.
	  var markedId = blockPath.scope.generateUidIdentifier("marked");
	  var markCallExp = t.callExpression(util.runtimeProperty("mark"), [node.id]);

	  var index = info.decl.declarations.push(t.variableDeclarator(markedId, markCallExp)) - 1;

	  var markCallExpPath = info.declPath.get("declarations." + index + ".init");

	  _assert2.default.strictEqual(markCallExpPath.node, markCallExp);

	  markCallExpPath.addComment("leading", "#__PURE__");

	  return markedId;
	}