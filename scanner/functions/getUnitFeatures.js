function getUnitFeatures(bounding_box, OSM_data, unit_options) {
	let proposed_unit_features = [];
	
	new_status();
	let i = 1;
	this.streets.eachLayer(function(layer) {
		status_update("Generating units for street " + i + " of " + this.streets.count() + " streets...");
		
		let street_feature = layer.feature,
		street_id = layer._leaflet_id,
		street_OSM_id = layer.feature.id,
		proposed_anchors = getUnitAnchors(street_feature, bounding_box, unit_options),
		new_proposed_unit_features = generateUnitFeatures(proposed_anchors, proposed_unit_features, street_id, street_OSM_id, unit_options);
		proposed_unit_features.push(...new_proposed_unit_features);
	
		i++;
	}, this);

	end_status();
	
	unit_features = unitsOutOfStreets(proposed_unit_features, this.streets);
	
	return unit_features;
}