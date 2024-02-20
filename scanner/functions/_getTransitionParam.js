function _getTransitionParam(transition, xdNode, ctx) {
	let type = TRANSITION_TYPE_MAP[transition.type] || "";
	let dir = TRANSITION_SIDE_MAP[transition.fromSide] || "";
	if (!type) { ctx.log.warn(`Transition type not supported: '${transition.type}'.`, xdNode); }
	return !type ? '' : `transition: LinkTransition.${type}${dir}, `;
}