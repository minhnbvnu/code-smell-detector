function setupStreetFeatures(OSM_data, street_options, street_layers) {
	console.log("Setting up streets...");
	let default_options = {
		"color": "yellow",
		"weight": 4,
		"opacity": .5
	};

	street_options = Object.assign(default_options, street_options);

	let street_feature_collection;

	if (typeof(street_layers) === "undefined") {
		let street_features = getStreetFeatures(OSM_data);
		
		street_feature_collection = {
			type: "FeatureCollection",
			features: street_features
		};
	}
	else {
		street_feature_collection = street_layers;
	}
	
	this.streets = L.geoJSON(
		street_feature_collection,
		street_options
	);
	
	//Map streets' OSM IDs to their Leaflet IDs.
	this.streets.id_map = {};

	//Having added the streets as layers to the map, do any processing that requires access to those layers.
	new_status()
	let i = 1;
	this.streets.eachLayer(function(street) {
		status_update("Relating " + i + " of " + this.streets.count() + " streets...");
		this.streets.id_map[street.feature.id] = street._leaflet_id; 

		addStreetLayerIntersections.call(this, street);

		i++;
	}, this);
	
	end_status();

	//Add general graph-making and path-finder-making methods to Agentmap, in case streets are added, removed, or modified mid-simulation.
	console.log("Generating street graph...");
	this.streetsToGraph = streetsToGraph,
		this.getPathFinder = getPathFinder;
	
	this.streets.graph = streetsToGraph(this.streets),
	this.pathfinder = getPathFinder(this.streets.graph);
}