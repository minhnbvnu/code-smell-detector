function doButtonClick(e) {
	if (_.isEmpty(e.modelObj)) {
		// use a custom query to quickly empty the SQLite store
		var db = Ti.Database.open('_alloy_');
		db.execute('DELETE FROM info;');
		db.close();

		// refresh the collection to reflect this in the UI
		info.fetch();
	} else {
		// create a model for the listitem
		var model = Alloy.createModel('info', e.modelObj);

		// add model to collection which will in turn update the UI
		info.add(model);

		// save the model to SQLite
		model.save();
	}
}