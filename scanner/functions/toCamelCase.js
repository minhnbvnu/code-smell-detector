function toCamelCase(str) {
	return str.replace(/-([a-z])/g, str => str.slice(1).toUpperCase());
}