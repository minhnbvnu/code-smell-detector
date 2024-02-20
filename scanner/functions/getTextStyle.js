function getTextStyle(styleParams) {
	let str = $.getParamList(styleParams);
	return  !str ? "" : `TextStyle(${str})`;
}