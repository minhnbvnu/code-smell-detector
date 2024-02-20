function extendClass(parent, members) {
	var object = function () {};
	object.prototype = new parent();
	extend(object.prototype, members);
	return object;
}