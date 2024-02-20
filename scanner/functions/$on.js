function $on(target, type, callback, capture) {
	target.addEventListener(type, callback, !!capture);
}