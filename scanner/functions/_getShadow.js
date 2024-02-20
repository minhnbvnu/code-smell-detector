function _getShadow(shadow) {
	let o = shadow;
	return `Shadow(color: ${getColor(o.color)}, ` +
		(o.x || o.y ? `offset: Offset(${o.x}, ${o.y}), ` : "") +
		(o.blur ? `blurRadius: ${o.blur}, ` : "") +
	")";
}