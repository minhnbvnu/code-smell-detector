function _getEaseParam(transition, xdNode, ctx) {
	let ease = TRANSITION_EASE_MAP[transition.easing] || "";
	if (!ease) { ctx.log.warn(`Ease not supported: '${transition.easing}'.`, xdNode); }
	return !ease ? '' : `ease: Curves.${ease}, `;
}