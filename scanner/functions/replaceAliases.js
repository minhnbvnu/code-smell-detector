function replaceAliases(argv) {
	let paths = argv.slice(0, 2);
	let replaced = [];
	let unmodified = [];

	argv.slice(2).forEach(arg => {
		let aliasFound = false;

		// this loop does not short circuit because an alias can map to multiple options
		options.forEach(option => {
			const aliases = option.aliases || [];
			aliases.forEach(alias => {
				if (arg.includes('--' + alias)) {
					replaced.push(arg.replace('--' + alias, '--' + option.name));
					aliasFound = true;
				}	
			});
		});

		if (!aliasFound) {
			unmodified.push(arg);
		}
	});

	return [...paths, ...replaced, ...unmodified];
}