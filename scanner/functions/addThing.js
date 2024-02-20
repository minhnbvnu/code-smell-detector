function addThing(e) {
	// create the test fighter model
	var model = Alloy.createModel('thing', {
		name: 'Thing ' + counter++
	});

	// add model to the collection and save it to sqlite
	things.add(model);
	model.save();

	// let's refresh so we can see the ids coming from the
	// autoincrement field in the sqlite database in the
	// row click alerts
	things.fetch();
}