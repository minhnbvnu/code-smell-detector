function isStatelessComponent(c) {
	return typeof c === 'function' && !(c.prototype && c.prototype.render);
}