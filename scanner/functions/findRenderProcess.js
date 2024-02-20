function findRenderProcess(events) {
	// TODO - Find a better way to identify the running process -
	// Will break if site opens multiple tabs
	// Also breaks if site does not have a title
	for (var i = 0; i < events.length; i++) {
		if (events[i].name === 'process_labels') {
			return events[i].pid;
		}
	}
	debug('Looked at all events, could not find a process_labels. Pid is undefined');
}