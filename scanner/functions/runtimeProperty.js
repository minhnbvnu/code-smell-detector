function runtimeProperty(name) {
	  return t.memberExpression(t.identifier("regeneratorRuntime"), t.identifier(name), false);
	}