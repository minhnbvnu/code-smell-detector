function addStreetLayerIntersections(street) {
	let street_id = street._leaflet_id;

	street.intersections = typeof(street.intersections) === "undefined" ? {} : street.intersections;

	this.streets.eachLayer(function(other_street) {
		let other_street_id = other_street._leaflet_id;

		//Skip if both streets are the same, or if the street already has its intersections with the other street.
		if (typeof(street.intersections[other_street_id]) === "undefined" && street_id !== other_street_id) {
			let street_coords = street.getLatLngs().map(L.A.pointToCoordinateArray),
			other_street_coords = other_street.getLatLngs().map(L.A.pointToCoordinateArray),
			identified_intersections = L.A.getIntersections(street_coords, other_street_coords, [street_id, other_street_id]).map(
				identified_intersection => 
				[L.latLng(L.A.reversedCoordinates(identified_intersection[0])), identified_intersection[1]]
			);

			if (identified_intersections.length > 0) {
				street.intersections[other_street_id] = identified_intersections,
				other_street.intersections = typeof(other_street.intersections) === "undefined" ? {} : other_street.intersections,
				other_street.intersections[street_id] = identified_intersections;
			}
		}
	});
}