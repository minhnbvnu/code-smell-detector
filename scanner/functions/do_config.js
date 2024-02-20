function do_config() {
		if (_nir_debug_) {
			console_log("do_config");
		}
		if (is_userscript || is_extension) {
			var settings_done = 0;
			var total_settings = Object.keys(settings).length + old_settings_keys.length;
			var add_value_change_listeners = function(cb) {
				if (typeof GM_addValueChangeListener === "undefined") {
					return cb();
				}
				// run in timeout to prevent this from further delaying initial page load times
				// takes ~2-3ms. not huge, but still significant
				setTimeout(function() {
					for (var setting in settings) {
						GM_addValueChangeListener(setting, function(name, oldValue, newValue, remote) {
							if (remote === false)
								return;
							var updated = {};
							updated[name] = { newValue: newValue };
							settings_updated_cb(updated);
						});
					}
				}, 1);
				cb();
			};
			var process_settings = function(settings) {
				get_values(settings, function(values) {
					// not Object.keys(values).length, because it may be smaller
					settings_done += settings.length;
					obj_foreach(values, function(key, value) {
						update_setting_from_host(key, value);
					});
					if (settings_done >= total_settings) {
						upgrade_settings(function(value) {
							add_value_change_listeners(function() {
								start( /*value*/); // commenting out because start doesn't need any arguments
							});
						});
					}
				});
			};
			process_settings(Object.keys(settings));
			process_settings(old_settings_keys);
		} else {
			start();
		}
	}