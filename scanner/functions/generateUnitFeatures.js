function generateUnitFeatures(unit_anchors, proposed_unit_features, street_leaflet_id, street_OSM_id, unit_options) {
	//One sub-array of unit features for each side of the road.
	let unit_features = [[],[]],
	starting_id = proposed_unit_features.length,
	increment = 1;
	
	for (let anchor_pair of unit_anchors) {
		//Pair of unit_features opposite each other on a street.
		let unit_pair = [null, null];
		
		for (let i of [1, -1]) {
			let anchor_a = anchor_pair[0].geometry.coordinates,
			anchor_b = anchor_pair[1].geometry.coordinates,
			anchor_latLng_pair = [anchor_a, anchor_b],
			street_buffer = unit_options.front_buffer / 1000, //Distance between center of street and start of unit.
			house_depth = unit_options.depth / 1000,
			angle = bearing(anchor_a, anchor_b),
			new_angle = angle + i * 90, //Angle of line perpendicular to the anchor segment.
			unit_feature = { 
				type: "Feature",
				properties: {
					street: "none"
				},
				geometry: {
					type: "Polygon",
					coordinates: [[]]
				}
			};
			unit_feature.geometry.coordinates[0][0] = destination(anchor_a, street_buffer, new_angle).geometry.coordinates,
			unit_feature.geometry.coordinates[0][1] = destination(anchor_b, street_buffer, new_angle).geometry.coordinates,
			unit_feature.geometry.coordinates[0][2] = destination(anchor_b, street_buffer + house_depth, new_angle).geometry.coordinates,
			unit_feature.geometry.coordinates[0][3] = destination(anchor_a, street_buffer + house_depth, new_angle).geometry.coordinates;
			unit_feature.geometry.coordinates[0][4] = unit_feature.geometry.coordinates[0][0];

			//Exclude the unit if it overlaps with any of the other proposed units.
			let all_proposed_unit_features = unit_features[0].concat(unit_features[1]).concat(proposed_unit_features);
			if (noOverlaps(unit_feature, all_proposed_unit_features)) { 
				//Recode index so that it's useful here.
				i = i === 1 ? 0 : 1;

				unit_feature.properties.street_id = street_leaflet_id,
				unit_feature.properties.OSM_street_id = street_OSM_id,
				unit_feature.properties.street_anchors = anchor_latLng_pair,	
				unit_feature.properties.neighbors = [null, null, null],
				unit_feature.properties.id = starting_id + increment,
				increment += 1;
				
				if (unit_features[i].length !== 0) {
					//Make previous unit_feature this unit_feature's first neighbor.
					unit_feature.properties.neighbors[0] = unit_features[i][unit_features[i].length - 1].properties.id,
					//Make this unit_feature the previous unit_feature's second neighbor.
					unit_features[i][unit_features[i].length - 1].properties.neighbors[1] = unit_feature.properties.id;
				}
				
				if (i === 0) {
					unit_pair[0] = unit_feature;
				}
				else {
					if (unit_pair[0] !== null) {
						//Make unit_feature opposite to this unit_feature on the street its third neighbor.
						unit_feature.properties.neighbors[2] = unit_pair[0].properties.id,
						//Make unit_feature opposite to this unit_feature on the street's third neighbor this unit_feature.
						unit_pair[0].properties.neighbors[2] = unit_feature.properties.id;
					}
					
					unit_pair[1] = unit_feature;
				}
			}
		}
		
		if (unit_pair[0] !== null) {
			unit_features[0].push(unit_pair[0]);
		}

		if (unit_pair[1] !== null) {
			unit_features[1].push(unit_pair[1]);
		}
	}

	let unit_features_merged = [].concat(...unit_features);
	
	return unit_features_merged;
}