function selectConsole(serial) {
	if(serial == null) {
		connection = null;
		setPrompt();
		r.prompt(true);
	} else {
		connection = connections[serial];
		setPrompt();
		r.prompt(true);
	}
}