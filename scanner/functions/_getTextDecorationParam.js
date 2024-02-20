function _getTextDecorationParam(o) {
	let u = o.underline, s = o.strikethrough, str = "";
	if (!u && !s) { return str; }
	if (u && s) {
		str = "TextDecoration.combine([TextDecoration.underline, TextDecoration.lineThrough])";
	} else {
		str = `TextDecoration.${u ? "underline" : "lineThrough"}`;
	}
	return `decoration: ${str}, `;
}