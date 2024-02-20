function streetsToGraph(streets) {
	let graph = createGraph(),
	streetToGraphBound = streetToGraph.bind(this, graph);
	
	//For each street, get an array of indices for the start, intersections, and end coordinates, in order from
	//start to end. Then, add the coordinates at each index as a node, and an edge between each adjacent node in the array,
	//associating the distance between the nodes (between their coordinates) with each edge.
	streets.eachLayer(streetToGraphBound);

	return graph;
}