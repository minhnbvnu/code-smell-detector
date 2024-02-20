function isUseStrict(node) {
	if (!node) return false;
	if (node.type !== 'ExpressionStatement') return false;
	if (node.expression.type !== 'Literal') return false;
	return node.expression.value === 'use strict';
}