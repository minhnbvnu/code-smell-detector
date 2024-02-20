function _getImageFilter(blur, ctx) {
	let sigStr = $.fix(blur.blurAmount, 0);
	return `ui.ImageFilter.blur(sigmaX: ${sigStr}, sigmaY: ${sigStr})`;
}