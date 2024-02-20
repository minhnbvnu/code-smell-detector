function safeToInline(obj) {
	for (let i = 0; i < obj.properties.length; i++) {
		if (obj.properties[i].kind !== 'init') {
			return false;
		}
	}
	return true;
}