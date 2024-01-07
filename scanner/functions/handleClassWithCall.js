function handleClassWithCall(constructorCall, classPath) {
	    var _classPath = classPath,
	        node = _classPath.node;

	    var ref = node.id || classPath.scope.generateUidIdentifier("class");

	    if (classPath.parentPath.isExportDefaultDeclaration()) {
	      classPath = classPath.parentPath;
	      classPath.insertAfter(t.exportDefaultDeclaration(ref));
	    }

	    classPath.replaceWithMultiple(buildWrapper({
	      CLASS_REF: classPath.scope.generateUidIdentifier(ref.name),
	      CALL_REF: classPath.scope.generateUidIdentifier(ref.name + "Call"),
	      CALL: t.functionExpression(null, constructorCall.node.params, constructorCall.node.body),
	      CLASS: t.toExpression(node),
	      WRAPPER_REF: ref
	    }));

	    constructorCall.remove();
	  }