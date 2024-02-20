function deleteTask(e) {
	// prevent bubbling up to the row
	e.cancelBubble = true;

	// find the todo task by id
	var todo = todos.get(id);

	// destroy the model from persistence, which will in turn remove
	// it from the collection, and model-view binding will automatically
	// reflect this in the tableview
	todo.destroy();
}