function buildingify(bounding_box, OSM_data, street_options, unit_options, unit_layers, street_layers) {
	setupStreetFeatures.call(this, OSM_data, street_options);
	setupUnitFeatures.call(this, bounding_box, OSM_data, unit_options, unit_layers);
	
	console.log("Finished!");
}