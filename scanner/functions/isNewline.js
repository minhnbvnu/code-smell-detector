function isNewline(node) {
	  return useNewlineChar ? node.textContent === '\n' : node.tagName === 'BR';
	}