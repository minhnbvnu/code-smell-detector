function createMountNode({ context, mountNodeId }) {
	const internalmountNodeId = mountNodeId || 'mount-node';
	// eslint-disable-next-line no-param-reassign
	context.dom = document.createElement('div');
	const mountNode = document.body.appendChild(context.dom);
	mountNode.id = internalmountNodeId;
	return mountNode;
}