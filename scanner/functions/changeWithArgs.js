function changeWithArgs() {
	dialogs.confirm({
		title: 'Confirm (args.buttonNames)',
		message: 'Are the args.buttonNames working?',
		buttonNames: ['Nope', 'Yup'],
		callback: changeWithArgsAgain
	});
}