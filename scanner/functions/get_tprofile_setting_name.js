function get_tprofile_setting_name(setting_name) {
			if (trigger_id) {
				var new_settingname = "t" + trigger_id + "_" + setting_name;
				if (new_settingname in settings)
					setting_name = new_settingname;
			}
			return setting_name;
		}