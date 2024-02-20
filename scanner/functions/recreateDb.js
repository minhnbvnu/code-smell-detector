function recreateDb(name) {
	return run(r.dbDrop(name))
		.catch(function(){})
		.then(function() { return run(r.dbCreate(name)); });
}