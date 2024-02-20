function streetToGraph(graph, street) {
	let street_id = street._leaflet_id,
	intersection_indices = [],
	street_points = street.getLatLngs();
	
	//Populate intersection_indices with the indices of all of the street's intersections in its coordinate array.
	for (let cross_street in street.intersections) {
		let intersections = street.intersections[cross_street];
		
		for (let intersection of intersections) {
			let intersection_index = intersection[1][street_id];
			
			//Ignore duplicate intersection points (caused by 3-way intersections).
			if (!intersection_indices.some(other_intersection_index => other_intersection_index === intersection_index)) {
				intersection_indices.push(intersection_index);
			}
		}
	}

	//Sort the intersection_indices so that they are in order from the start of the street's coordinate array to the end;
	//this is why we're not getting the raw coordinates, but their indices first, so they can be sorted.
	intersection_indices = intersection_indices.sort(function(a, b) {
		return a - b;
	});

	//Check if beginning and end points of the street are in the intersection_incides; if not, add them.
	if (!intersection_indices.some(intersection_index => intersection_index === 0)) {
		intersection_indices.unshift(0);
	}
	if (!intersection_indices.some(intersection_index => intersection_index === street_points.length - 1)) {
		intersection_indices.push(street_points.length - 1);
	}

	//Make a graph out of segments of the street between the start, intersections, and end of the street,
	//so that the nodes are the coordinates of the start, end, and intersection points, and the edges are
	//the segments between successive nodes. Each edge is associated with the geographic distance between its nodes.
	for (let i = 0; i <= intersection_indices.length - 2; i++) {
		let node_a = street_points[intersection_indices[i]],
		node_b = street_points[intersection_indices[i + 1]],
		a_string = encodeLatLng(node_a),
		b_string = encodeLatLng(node_b),
		start_coords = L.A.pointToCoordinateArray(node_a),
		end_coords = L.A.pointToCoordinateArray(node_b),
		segment = lineSlice(start_coords, end_coords, street.toGeoJSON()),
		distance = length(segment);
		graph.addLink(a_string, b_string, {
			distance: distance,
			place: { type: "street",
				id: street_id } 
		});
	}
}