function upgrade_settings_with_version(version, new_settings, cb) {
		if (!version) {
			version = 0;
		} else if (typeof version !== "number") {
			version = parseInt(version);
			if (isNaN(version))
				version = 0;
		}
		if (new_settings === void 0)
			new_settings = settings;
		var changed = false;
		if (version === 0) {
			if (new_settings.mouseover_trigger) {
				var trigger_keys = [];
				for (var i = 0; i < new_settings.mouseover_trigger.length; i++) {
					var trigger = new_settings.mouseover_trigger[i];
					if (trigger.match(/^delay_[0-9]+/)) {
						var delay = parse_int(new_settings.mouseover_trigger[i].replace(/^delay_([0-9]+).*?$/, "$1"));
						if (delay <= 0 || isNaN(delay))
							delay = false;
						if (typeof delay === "number" && delay >= 10)
							delay = 10;
						update_setting("mouseover_trigger_delay", delay);
						continue;
					}
					trigger_keys.push(trigger);
				}
				if (trigger_keys.length === 0) {
					update_setting("mouseover_trigger_key", orig_settings["mouseover_trigger_key"]);
					update_setting("mouseover_trigger_behavior", "mouse");
				} else {
					update_setting("mouseover_trigger_key", trigger_keys);
					update_setting("mouseover_trigger_behavior", "keyboard");
				}
			}
			update_setting("settings_version", 1);
			changed = true;
			version = 1;
		}
		if (version === 1) {
			var partial_setting = "none";
			var partial_setting_set = new_settings.mouseover_use_fully_loaded_video !== void 0 ||
				new_settings.mouseover_use_fully_loaded_image !== void 0;
			if (partial_setting_set) {
				if (new_settings.mouseover_use_fully_loaded_video === false ||
					new_settings.mouseover_use_fully_loaded_video === void 0) {
					partial_setting = "video";
				}
				if (new_settings.mouseover_use_fully_loaded_image === void 0) {
					if (!orig_settings.mouseover_use_fully_loaded_image) {
						partial_setting = "media";
					}
				} else if (new_settings.mouseover_use_fully_loaded_image === false) {
					partial_setting = "media";
				}
				update_setting("mouseover_allow_partial", partial_setting);
			}
			update_setting("settings_version", 2);
			changed = true;
			version = 2;
		}
		if (version === 2) {
			if ("mouseover_close_on_leave_el" in new_settings) {
				var policy;
				if (new_settings.mouseover_close_on_leave_el) {
					policy = "both";
				} else {
					policy = "popup";
				}
				update_setting("mouseover_close_el_policy", policy);
			}
			update_setting("settings_version", 3);
			changed = true;
			version = 3;
		}
		if (version === 3) {
			if ("mouseover_scroll_behavior" in new_settings) {
				if (get_single_setting_raw(new_settings.mouseover_scroll_behavior) !== "zoom") {
					update_setting("mouseover_scrollx_behavior", new_settings.mouseover_scroll_behavior);
				}
				update_setting("mouseover_scrolly_behavior", new_settings.mouseover_scroll_behavior);
			}
			update_setting("settings_version", 4);
			changed = true;
			version = 4;
		}
		if (version === 4) {
			if ("mouseover_mask_styles" in new_settings && new_settings.mouseover_mask_styles) {
				update_setting("mouseover_mask_styles2", new_settings.mouseover_mask_styles);
				update_setting("mouseover_enable_mask_styles", true);
			}
			update_setting("settings_version", 5);
			changed = true;
			version = 5;
		}
		if (version === 5) {
			if ("mouseover_video_seek_vertical_scroll" in new_settings && new_settings.mouseover_video_seek_vertical_scroll) {
				update_setting("mouseover_scrolly_video_behavior", "seek");
			}
			if ("mouseover_video_seek_horizontal_scroll" in new_settings && new_settings.mouseover_video_seek_horizontal_scroll) {
				update_setting("mouseover_scrollx_video_behavior", "seek");
			}
			update_setting("settings_version", 6);
			changed = true;
			version = 6;
		}
		if (version === 6) {
			if ("mouseover_support_pointerevents_none" in new_settings && new_settings.mouseover_support_pointerevents_none) {
				update_setting("mouseover_find_els_mode", "full");
			}
			update_setting("settings_version", 7);
			changed = true;
			version = 7;
		}
		if (version === 7) {
			if ("mouseover_enable_mask_styles" in new_settings && new_settings.mouseover_enable_mask_styles) {
				update_setting("mouseover_enable_mask_styles2", "always");
			}
			update_setting("settings_version", 8);
			changed = true;
			version = 8;
		}
		if (version === 8) {
			if ("allow_video" in new_settings && !new_settings.allow_video) {
				update_setting("mouseover_allow_video", false);
				for (var i = 0; i < num_profiles; i++) {
					update_setting("t" + (i + 2) + "_mouseover_allow_video", false);
				}
				update_setting("redirect_video", false);
			}
			update_setting("settings_version", 9);
			changed = true;
			version = 9;
		}
		if (version === 9) {
			if ("allow_audio" in new_settings && new_settings.allow_audio) {
				update_setting("mouseover_allow_audio", true);
				for (var i = 0; i < num_profiles; i++) {
					update_setting("t" + (i + 2) + "_mouseover_allow_audio", true);
				}
				update_setting("redirect_audio", true);
			}
			update_setting("settings_version", 10);
			changed = true;
			version = 10;
		}
		if (version === 10) {
			if ("replaceimgs_remove_size_constraints" in new_settings && new_settings.replaceimgs_remove_size_constraints) {
				update_setting("replaceimgs_size_constraints", "remove");
			}
			update_setting("settings_version", 11);
			changed = true;
			version = 11;
		}
		cb(changed);
	}