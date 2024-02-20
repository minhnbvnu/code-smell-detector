function pushScopeAncestors(ancestorScopes, scope) {
		if (!scopes.hasOwnProperty(scope)) {
			return;
		}
		var parentScopes = scopes[scope];
		for (var i = 0; i < parentScopes.length; i++) {
			var parentScope = parentScopes[i];
			ancestorScopes.push(parentScope);
			pushScopeAncestors(ancestorScopes, parentScope);
		}
	}