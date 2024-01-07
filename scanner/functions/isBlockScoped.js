function isBlockScoped(node) {
	  return t.isFunctionDeclaration(node) || t.isClassDeclaration(node) || t.isLet(node);
	}