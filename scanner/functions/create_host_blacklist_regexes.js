function create_host_blacklist_regexes() {
		host_blacklist_regexes = [];
		try {
			host_blacklist_regexes = parse_blacklist_regexes(settings.host_blacklist, settings.bigimage_blacklist_engine);
		} catch (e) {
			return [e];
		}
	}