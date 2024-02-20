function incrementScore(e) {
	var model = items.get(e.row.id);
	if (model) {
		model.set('score', model.get('score') + 1);
	}
}