function testParameter(name, filters) {
	return filters.some(filter => filter instanceof RegExp ? filter.test(name) : filter === name);
}