function rankChild(vnode) {
	return vnode.props.default ? 0 : rank(vnode.props.path);
}