function settings_updated_cb(changes) {
		if (!settings.allow_live_settings_reload)
			return;
		//console_log(message);
		var changed = false;
		for (var key in changes) {
			if (changes[key].newValue === void 0)
				continue;
			//console_log("Setting " + key + " = " + changes[key].newValue);
			var newvalue = JSON_parse(changes[key].newValue);
			if (key in settings_history) {
				var index = array_indexof(settings_history[key], newvalue);
				var pass = false;
				if (index >= 0 && index < settings_history[key].length - 1) {
					pass = true;
				}
				settings_history[key].splice(index, 1);
				if (pass)
					continue;
			}
			var setting_updated = update_setting_from_host(key, newvalue);
			changed = setting_updated || changed;
			if (setting_updated && key in settings_meta && "onupdate" in settings_meta[key]) {
				settings_meta[key].onupdate();
			}
		}
		if (changed && updating_options <= 0 && is_options_page) {
			//console_log("Refreshing options");
			do_options();
		}
	}