function showTasks(e) {
	if (typeof e.index !== 'undefined' && e.index !== null) {
		whereIndex = e.index; // TabbedBar
	} else {
		whereIndex = INDEXES[e.source.title]; // Android menu
	}
	todos.fetch();
}