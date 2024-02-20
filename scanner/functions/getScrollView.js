function getScrollView(childStr, node, ctx) {
	return 'SingleChildScrollView(' +
		'primary: false,' + // avoid vertical scroll views on desktop trying to share PrimaryScrollController.
		_getScrollDirectionParam(node, ctx) +
		`child: ${childStr}, ` +
	')';
}