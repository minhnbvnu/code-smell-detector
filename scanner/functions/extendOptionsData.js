function extendOptionsData() {
	// add more data to each option based on its type
	const map = {
		boolean: {
			prompt: 'confirm',
			coerce: coerceBoolean,
		},
		file: {
			prompt: 'input',
			coerce: coercePath,
			validate: validateFile
		},
		folder: {
			prompt: 'input',
			coerce: coercePath
		}
	};

	options.forEach(option => {
		Object.assign(option, map[option.type]);
	});
}