function getMethods(type) {
		var methods = $[namespace][plugin][type] || [];
		return (typeof methods == 'string' ? methods.split(/,?\s+/) : methods);
	}