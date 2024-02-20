function createPortal(vnode, container) {
	return h(Portal, { vnode, container });
}