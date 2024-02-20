function toggleStatus(e) {
	// find the todo task by id
	var todo = todos.get(id);

	// set the current 'done' and 'date_completed' fields for the model,
	// then save to presistence, and model-view binding will automatically
	// reflect this in the tableview
	todo.set({
		'done': todo.get('done') ? 0 : 1,
		'date_completed': moment().unix()
	}).save();
}