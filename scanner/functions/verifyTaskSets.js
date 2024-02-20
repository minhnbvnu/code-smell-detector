function verifyTaskSets(gulp, taskSets, skipArrays) {
	if(taskSets.length === 0) {
		throw new Error('No tasks were provided to run-sequence');
	}

	var foundTasks = {};
	taskSets.forEach(function(t) {
		var isTask = typeof t === "string";
		var isArray = !skipArrays && Array.isArray(t);
		if(!isTask && !isArray) {
			throw new Error("Task " + t + " is not a valid task string.");
		}
		if(isTask && !gulp.hasTask(t)) {
			throw new Error("Task " + t + " is not configured as a task on gulp.  If this is a submodule, you may need to use require('run-sequence').use(gulp).");
		}
		if(skipArrays && isTask) {
			if(foundTasks[t]) {
				throw new Error("Task " + t + " is listed more than once. This is probably a typo.");
			}
			foundTasks[t] = true;
		}
		if(isArray) {
			if(t.length === 0) {
				throw new Error("An empty array was provided as a task set");
			}
			verifyTaskSets(gulp, t, true, foundTasks);
		}
	});
}