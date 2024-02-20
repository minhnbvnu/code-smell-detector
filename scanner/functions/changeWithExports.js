function changeWithExports() {
	dialogs.title = 'Confirm (exports)';
	dialogs.message = 'For real?';
	dialogs.buttonNames = ['Naaah', 'Fo shizzle'];

	dialogs.confirm({
		callback: changeWithArgs
	});
}