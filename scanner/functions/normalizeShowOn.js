function normalizeShowOn(container, showOn) {
		switch ($.type(showOn)) {
		case 'function':
			return showOn;
		case 'object':
			if (showOn.scope) {
				if (scopeFns[showOn.scope]) {
					return scopeFns[showOn.scope];
				}
				return scopeFns[showOn.scope] = function () {
					return Scopes.isActiveScope(showOn.scope);
				};
			} else {
				throw "Invalid showOn configuration";
			}
		default:
			return returnTrue;
		}
	}