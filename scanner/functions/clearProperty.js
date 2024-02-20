function clearProperty(scope, propertyName) {
	try {
		delete scope[propertyName];
	}
	catch (e) {
		// IE doesn't like to delete properties on the window object
		if (propertyName in scope) {
			scope[propertyName] = void 0;
		}
	}
}