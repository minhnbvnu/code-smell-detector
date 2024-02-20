function _getImageFilterParam(blur, ctx) {
	// currently just exports blurs.
	return `filter: ${_getImageFilter(blur, ctx)}, `;
}