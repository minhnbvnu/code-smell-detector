function fname(fn) {
	if (fn === setImmediate) return 'setImmediate';
	return fn.name;
}