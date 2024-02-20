function getAllContextNodes(context, nodes, visited) {
	if (nodes === null) {
		nodes = [];
		return getAllContextNodes(context, nodes, visited);
	} else if (visited === null) {
		visited = {};
		return getAllContextNodes(context, nodes, visited);
	} else {
		if (context === null || visited[context] !== null) {
			return nodes;
		}
		visited[context] = context;
		nodes.push(context);
		for (var i = 0; i < context.length; i++) {
			getAllContextNodes(context.getParent(i), nodes, visited);
		}
		return nodes;
	}
}