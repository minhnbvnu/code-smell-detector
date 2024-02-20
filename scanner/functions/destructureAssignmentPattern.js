function destructureAssignmentPattern(
	code,
	createIdentifier,
	resolveName,
	node,
	ref,
	inline,
	statementGenerators
) {
	const isIdentifier = node.left.type === 'Identifier';
	const name = isIdentifier ? node.left.name : ref;

	if (!inline) {
		statementGenerators.push((start, prefix, suffix) => {
			code.prependRight(
				node.left.end,
				`${prefix}if ( ${name} === void 0 ) ${name}`
			);
			code.move(node.left.end, node.right.end, start);
			code.appendLeft(node.right.end, suffix);
		});
	}

	if (!isIdentifier) {
		destructure(code, createIdentifier, resolveName, node.left, ref, inline, statementGenerators);
	}
}