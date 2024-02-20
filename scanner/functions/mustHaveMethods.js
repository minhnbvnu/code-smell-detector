function mustHaveMethods(obj, methodNames) {
	for (const methodName of methodNames) {
		if (typeof obj[methodName] != 'function') {
			console.error("Missing method", methodName, "on object", obj);
			throw new TypeError("missing method " + methodName);
		}
	}
	return true;
}