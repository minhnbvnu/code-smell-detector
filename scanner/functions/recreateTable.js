function recreateTable(name) {
	return run(r.tableDrop(name))
		.catch(function(){})
		.then(function() { return run(r.tableCreate(name)); });
}