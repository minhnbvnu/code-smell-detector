function isObsoleteLandingNode(node) {
		return 'SPAN' === node.nodeName &&
			(node.childNodes.length === 0 || node.innerHTML === '&nbsp;');
	}