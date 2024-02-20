function resetTableData() {
	rowControllers = [];

	// create row controllers based on all models in the collection
	_.each(items.toJSON(), function(i) {
		rowControllers.push(Alloy.createController('collection/row', {
			id: i.id,
			name: i.name,
			score: i.score
		}));
	});

	// fill table with the controllers' TableViewRow, and sort
	// by the row's ID
	var theArray = _.sortBy(rowControllers, function(r) {
		return r.getView('name').text;
	});
	$.table.setData(_.map(theArray, function(r) {return r.getView();}));
}