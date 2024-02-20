function getStreetFeatures(OSM_data) {
	let street_features = [];

	for (let i =  0; i < OSM_data.features.length; ++i) {
		let feature = OSM_data.features[i];

		if (feature.geometry.type === "LineString" && feature.properties.highway) {
			let street_feature = feature;

			street_features.push(street_feature);
		}
	}

	return street_features;
}