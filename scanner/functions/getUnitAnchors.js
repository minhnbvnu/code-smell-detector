function getUnitAnchors(street_feature, bounding_box, unit_options) {
	let unit_anchors = [],
	unit_length = unit_options.length / 1000, //Kilometers.
	unit_buffer = unit_options.side_buffer / 1000, //Distance between units, kilometers.
	endpoint = street_feature.geometry.coordinates[street_feature.geometry.coordinates.length - 1],
	start_anchor = along(street_feature, 0),
	end_anchor = along(street_feature, unit_length),
	distance_along = unit_length;
	
	while (end_anchor.geometry.coordinates != endpoint) {
		//Exclude proposed anchors if they're outside of the bounding box.
		start_coord = L.A.reversedCoordinates(start_anchor.geometry.coordinates), 
		end_coord = L.A.reversedCoordinates(end_anchor.geometry.coordinates);
		
		if (L.latLngBounds(bounding_box).contains(start_coord) &&
			L.latLngBounds(bounding_box).contains(end_coord)) {
				unit_anchors.push([start_anchor, end_anchor]);
		}

		//Find next pair of anchors.
		start_anchor = along(street_feature, distance_along + unit_buffer);
		end_anchor = along(street_feature, distance_along + unit_buffer + unit_length);
		
		distance_along += unit_buffer + unit_length;
	}

	return unit_anchors;
}