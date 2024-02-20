function getResponseOptions(response) {
	let options = null;
	let header = response.headers.get('x-HTML-Edge-Cache');
	if (header) {
		options = {
			purge: false,
			cache: false,
			bypassCookies: [],
		};
		let commands = header.split(',');
		for (let command of commands) {
			if (command.trim() === 'purgeall') {
				options.purge = true;
			} else if (command.trim() === 'cache') {
				options.cache = true;
			} else if (command.trim().startsWith('bypass-cookies')) {
				let separator = command.indexOf('=');
				if (separator >= 0) {
					let cookies = command.substr(separator + 1).split('|');
					for (let cookie of cookies) {
						cookie = cookie.trim();
						if (cookie.length) {
							options.bypassCookies.push(cookie);
						}
					}
				}
			}
		}
	}

	return options;
}