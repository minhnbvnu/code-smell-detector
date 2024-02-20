function destructureArrayPattern(
	code,
	createIdentifier,
	resolveName,
	node,
	ref,
	inline,
	statementGenerators
) {
	let c = node.start;

	node.elements.forEach((element, i) => {
		if (!element) return;

		if (element.type === 'RestElement') {
			handleProperty(
				code,
				createIdentifier,
				resolveName,
				c,
				element.argument,
				`${ref}.slice(${i})`,
				inline,
				statementGenerators
			);
		} else {
			handleProperty(
				code,
				createIdentifier,
				resolveName,
				c,
				element,
				`${ref}[${i}]`,
				inline,
				statementGenerators
			);
		}
		c = element.end;
	});

	code.remove(c, node.end);
}