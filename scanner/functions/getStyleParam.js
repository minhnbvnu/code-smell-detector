function getStyleParam(styleParams) {
	if (!styleParams) { return ""; }
	let str = getTextStyle(styleParams);
	return !str ? "" : `style: ${str}, `;
}