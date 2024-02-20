function removeEmptyLine(css, lineEnding) {
	const root = postcss.parse(css);

	removeEmptyLinesBefore(root.nodes[1], lineEnding);

	return root.toString();
}