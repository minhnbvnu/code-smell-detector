function critical(msg, ...args) {
	if (msg instanceof Function) {
		return getLogger('default').critical(msg, ...args);
	}
	return getLogger('default').critical(msg, ...args);
}