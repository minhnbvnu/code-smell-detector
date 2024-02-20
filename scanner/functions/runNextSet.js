function runNextSet() {
		if(taskSets.length) {
			var command = taskSets.shift();
			if(!Array.isArray(command)) {
				command = [command];
			}
			currentTaskSet = command;
			gulp.start.apply(gulp, command);
		} else {
			finish();
		}
	}