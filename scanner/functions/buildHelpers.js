function buildHelpers(body, namespace, whitelist) {
	  helpers.list.forEach(function (name) {
	    if (whitelist && whitelist.indexOf(name) < 0) return;

	    var key = t.identifier(name);
	    body.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(namespace, key), helpers.get(name))));
	  });
	}