function seqUnitAgentMaker(id){
	let index = this.agents.count();

	if (index > this.units.getLayers().length - 1) {
		throw new Error("seqUnitAgentMaker cannot accommodate more agents than there are units.");
	}
	
	let unit = this.units.getLayers()[index],
	unit_id = this.units.getLayerId(unit),
	center_point = centroid(unit.feature);
	center_point.properties.place = {"type": "unit", "id": unit_id},
	center_point.properties.layer_options = {radius: .5, color: "red", fillColor: "red"}; 
	
	return center_point;
}