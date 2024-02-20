async function loadMarkdownFilePromise(post) {
	let output = '---\n';

	Object.entries(post.frontmatter).forEach(([key, value]) => {
		let outputValue;
		if (Array.isArray(value)) {
			if (value.length > 0) {
				// array of one or more strings
				outputValue = value.reduce((list, item) => `${list}\n  - "${item}"`, '');
			}
		} else {
			// single string value
			const escapedValue = (value || '').replace(/"/g, '\\"');
			outputValue = `"${escapedValue}"`;
		}

		if (outputValue !== undefined) {
			output += `${key}: ${outputValue}\n`;
		}
	});

	output += `---\n\n${post.content}\n`;
	return output;
}