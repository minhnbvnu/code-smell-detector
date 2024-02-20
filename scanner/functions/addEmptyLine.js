function addEmptyLine(css, lineEnding) {
	const root = postcss.parse(css);

	addEmptyLineBefore(root.nodes[1], lineEnding);

	return root.toString();
}