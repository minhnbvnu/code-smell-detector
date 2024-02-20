function parentsUntilIncl(node, pred) {
		var parents = parentsUntil(node, pred);
		var topmost = parents.length ? parents[parents.length - 1] : node;
		if (topmost.parentNode) {
			parents.push(topmost.parentNode);
		}
		return parents;
	}