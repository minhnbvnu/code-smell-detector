function tryRequire(prefix, name) {
	try {
		return require(prefix + name);				
	} catch (ex) {
		return require(name);
	}
}