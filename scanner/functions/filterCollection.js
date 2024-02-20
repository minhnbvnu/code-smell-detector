function filterCollection(collection) { 
	return collection.filter(function(model) {
		return model.get('text').split(/\s+/)[1] % 2;
	});
}