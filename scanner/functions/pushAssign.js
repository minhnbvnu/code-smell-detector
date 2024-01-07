function pushAssign(objId, prop, body) {
	    if (prop.kind === "get" && prop.kind === "set") {
	      pushMutatorDefine(objId, prop, body);
	    } else {
	      body.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(objId, prop.key, prop.computed || t.isLiteral(prop.key)), getValue(prop))));
	    }
	  }