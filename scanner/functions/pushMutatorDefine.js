function pushMutatorDefine(_ref2, prop) {
	    var objId = _ref2.objId,
	        body = _ref2.body,
	        getMutatorId = _ref2.getMutatorId,
	        scope = _ref2.scope;

	    var key = !prop.computed && t.isIdentifier(prop.key) ? t.stringLiteral(prop.key.name) : prop.key;

	    var maybeMemoise = scope.maybeGenerateMemoised(key);
	    if (maybeMemoise) {
	      body.push(t.expressionStatement(t.assignmentExpression("=", maybeMemoise, key)));
	      key = maybeMemoise;
	    }

	    body.push.apply(body, buildMutatorMapAssign({
	      MUTATOR_MAP_REF: getMutatorId(),
	      KEY: key,
	      VALUE: getValue(prop),
	      KIND: t.identifier(prop.kind)
	    }));
	  }