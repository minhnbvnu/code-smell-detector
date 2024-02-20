function create_blacklist_regexes() {
		blacklist_regexes = [];
		try {
			blacklist_regexes = parse_blacklist_regexes(settings.bigimage_blacklist, settings.bigimage_blacklist_engine);
		} catch (e) {
			return [e];
		}
		//console_log(blacklist_regexes);
	}