function createFactory(type) {
	return createElement.bind(null, type);
}