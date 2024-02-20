function setupUnitFeatures(bounding_box, OSM_data, unit_options = {}, unit_layers) {
	console.log("Setting up units...");

	let default_options = {
			"color": "green",
			"weight": 1,
			"opacity": .87,
			"front_buffer": 6,
			"side_buffer": 3,
			"length": 14,
			"depth": 18
	};

	unit_options = Object.assign(default_options, unit_options);
	
	let unit_feature_collection;

	//If no unit_layers is supplied, generate the units from scratch.
	if (typeof(unit_layers) === "undefined") {
		//Bind getUnitFeatures to "this" so it can access the agentmap as "this.agentmap".
		let unit_features = getUnitFeatures.bind(this)(bounding_box, OSM_data, unit_options);

		unit_feature_collection = { 
			type: "FeatureCollection", 
			features: unit_features
		};
	}
	else {
		unit_feature_collection = unit_layers;
	}
	
	console.log("Loading units...");
	this.units = L.geoJSON(
		unit_feature_collection,
		unit_options
	);
		
	new_status();
	let i = 1;
	//Having added the units as layers to the map, do any processing that requires access to those layers.
	this.units.eachLayer(function(unit) {
		if (typeof(unit_layers) === "undefined") {
			unit.street_id = unit.feature.properties.street_id;
		}
		else {
			unit.street_id = this.streets.id_map[unit.feature.properties.OSM_street_id];
		}

		unit.street_anchors = unit.feature.properties.street_anchors,
		
		status_update("Finding neighbors for unit " + i + " of " + this.units.count() + " units.");
		//Change the IDs of each unit in this unit's neighbours array into the appropriate Leaflet IDs.
		unit.neighbors = getUnitNeighborLayerIDs.call(this, unit.feature.properties.neighbors);
		i++;
	}, this);

	end_status();
}