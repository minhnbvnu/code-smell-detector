function getPathFinder(graph) {
	return path.aStar(graph, {
		distance(fromNode, toNode, link) {
			return link.data.distance;
		}
	});
}