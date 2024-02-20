function onTaskEnd(event) {
		var idx = currentTaskSet.indexOf(event.task);
		if(idx > -1) {
			currentTaskSet.splice(idx, 1);
		}
		if(currentTaskSet.length === 0) {
			runNextSet();
		}
	}