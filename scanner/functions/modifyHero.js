function modifyHero(e) {
	var model = heroes.at(e.index);
	model.set('name', model.get('name') + '+');

	// this should throw a warning since it is attempting
	// to sync on a collection that has no persistence.
	model.save();
}