function getUnitNeighborLayerIDs(neighbors) {
	let neighbor_layer_ids = neighbors.map(function(neighbor) {
		if (neighbor !== null) {
			let neighbor_layer_id = null;
			
			this.units.eachLayer(function(possible_neighbor_layer) {
				if (possible_neighbor_layer.feature.properties.id === neighbor) {
					neighbor_layer_id = this.units.getLayerId(possible_neighbor_layer);
				}
			}, this);

			return neighbor_layer_id;
		}
		else {
			return null;
		}
	}, this);

	return neighbor_layer_ids;
}