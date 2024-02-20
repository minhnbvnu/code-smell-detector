function _getColorParam(o, fill) {
	return `color: ${fill || getColor(o.fill, NodeUtils.getOpacity(o))}, `;
}