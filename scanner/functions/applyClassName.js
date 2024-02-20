function applyClassName(vnode) {
	let a = vnode.attributes || (vnode.attributes = {});
	classNameDescriptor.enumerable = 'className' in a;
	if (a.className) a.class = a.className;
	Object.defineProperty(a, 'className', classNameDescriptor);
}