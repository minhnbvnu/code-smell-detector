function agentify(count, agentFeatureMaker) {
	let agentmap = this;

	if (!(this.agents instanceof L.LayerGroup)) {
		this.agents = L.featureGroup().addTo(this.map);
	}

	let agents_existing = agentmap.agents.getLayers().length;
	for (let i = agents_existing; i < agents_existing + count; i++) {
		let new_agent = agent(null, null, agentmap);
		
		//Callback function aren't automatically bound to the agentmap.
		let boundFeatureMaker = agentFeatureMaker.bind(agentmap),
		agent_feature = boundFeatureMaker(new_agent._leaflet_id);
		
		let coordinates = L.A.reversedCoordinates(agent_feature.geometry.coordinates),
		place = agent_feature.properties.place,
		layer_options = agent_feature.properties.layer_options;
		
		//Make sure the agent feature is valid and has everything we need.
		if (!L.A.isPointCoordinates(coordinates)) {
			throw new Error("Invalid feature returned from agentFeatureMaker: geometry.coordinates must be a 2-element array of numbers.");	
		}
		else if (typeof(place.id) !== "number") {
			throw new Error("Invalid feature returned from agentFeatureMaker: properties.place must be a {unit: unit_id} or {street: street_id} with an existing layer's ID.");	
		}

		new_agent.setLatLng(coordinates);
		new_agent.setStyle(layer_options);
		
		delete agent_feature.properties.layer_options;
		Object.assign(new_agent, agent_feature.properties);
		
		this.agents.addLayer(new_agent);
	}
}