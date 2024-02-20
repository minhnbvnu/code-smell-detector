function upgrade_settings(cb) {
		try {
			create_blacklist_regexes();
		} catch (e) {
			console_error(e);
		}
		if (!settings.last_update_check) {
			update_setting("last_update_check", Date.now());
		}
		check_updates_if_needed();
		// TODO: merge this get_value in do_config for performance
		get_value("settings_version", function(version) {
			upgrade_settings_with_version(version, settings, cb);
		});
	}