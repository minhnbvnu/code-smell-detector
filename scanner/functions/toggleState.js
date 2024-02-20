function toggleState() {
	_.each(Alloy.Collections.heroes.models, function(model) {
		model.set('status', Math.random() > 0.5);
	});
}