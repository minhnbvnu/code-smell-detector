function cleanVNode(vnode) {
	const clone = Object.assign({}, vnode);
	delete clone.id;
	delete clone.constructor;
	delete clone.__v;
	return clone;
}