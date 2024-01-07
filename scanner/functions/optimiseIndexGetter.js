function optimiseIndexGetter(path, argsId, offset) {
	  var index = void 0;

	  if (t.isNumericLiteral(path.parent.property)) {
	    index = t.numericLiteral(path.parent.property.value + offset);
	  } else if (offset === 0) {
	    index = path.parent.property;
	  } else {
	    index = t.binaryExpression("+", path.parent.property, t.numericLiteral(offset));
	  }

	  var scope = path.scope;

	  if (!scope.isPure(index)) {
	    var temp = scope.generateUidIdentifierBasedOnNode(index);
	    scope.push({ id: temp, kind: "var" });
	    path.parentPath.replaceWith(restIndexImpure({
	      ARGUMENTS: argsId,
	      INDEX: index,
	      REF: temp
	    }));
	  } else {
	    path.parentPath.replaceWith(restIndex({
	      ARGUMENTS: argsId,
	      INDEX: index
	    }));
	  }
	}