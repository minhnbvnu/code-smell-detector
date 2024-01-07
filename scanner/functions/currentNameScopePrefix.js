function currentNameScopePrefix() {
	  if (_nameScopeStack.length === 0) {
	    return '';
	  } else {
	    return _nameScopeStack.join(_nameScopeDivider) + _nameScopeDivider;
	  }
	}