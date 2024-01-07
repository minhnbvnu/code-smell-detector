function getPrototypeOfExpression(objectRef, isStatic) {
	  var targetRef = isStatic ? objectRef : t.memberExpression(objectRef, t.identifier("prototype"));

	  return t.logicalExpression("||", t.memberExpression(targetRef, t.identifier("__proto__")), t.callExpression(t.memberExpression(t.identifier("Object"), t.identifier("getPrototypeOf")), [targetRef]));
	}