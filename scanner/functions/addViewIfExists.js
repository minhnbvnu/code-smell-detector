function addViewIfExists(id, parent) {
	var view;

	// find the UI component by id
	if (view = _.find(children, function(c) { return c.id === id; })) {

		// add a class to style it
		$.addClass(view, id);

		// add the component to the given parent container
		parent.add(view);
	}
}