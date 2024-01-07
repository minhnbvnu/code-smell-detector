function getNodeNameWithContextId(name, contextId) {
	  return !!contextId ? name + "-" + contextId : name;
	}