function unitsOutOfStreets(unit_features, street_layers) {
	let processed_unit_features = unit_features.slice();
	
	new_status();
	let i = 1;
	street_layers.eachLayer(function(street_layer) {
		status_update("Removing superfluous units from streets. Checking street " + i + " of " + street_layers.count() + "...");
		
		let street_feature = street_layer.feature;
		for (let unit_feature of processed_unit_features) {
			let intersection_exists = lineIntersect(street_feature, unit_feature).features.length > 0;
			if (intersection_exists) {
				processed_unit_features.splice(processed_unit_features.indexOf(unit_feature), 1, null);
			}	
		}	

		processed_unit_features = processed_unit_features.filter(feature => feature === null ? false : true);
		i++;
	});
	
	end_status();

	return processed_unit_features;
}