function check_disabled_options() {
			var options = options_el.querySelectorAll("div.option");
			enabled_map = {};
			for (var i = 0; i < options.length; i++) {
				var setting = options[i].id.replace(/^option_/, "");
				var enabled = check_option(setting);
				if (enabled) {
					options[i].classList.remove("disabled");
					options[i].classList.remove("disabled-hidden");
					options[i].getElementsByClassName("requirements")[0].classList.add("hidden");
					var meta = settings_meta[setting];
					var meta_options = meta.options;
					var regexp = new RegExp("^input_" + setting + "_");
					var els = options[i].querySelectorAll("input, textarea, button, select, option");
					for (var j = 0; j < els.length; j++) {
						var input = els[j];
						input.disabled = false;
						if (meta_options) {
							var option_name = input.id.replace(regexp, "");
							if (option_name !== input.id) {
								var option_value = get_option_from_options(meta_options, option_name);
								if (option_value) {
									if (!check_sub_option(option_value)) {
										input.disabled = true;
									}
								}
							}
						}
					}
				} else {
					options[i].classList.add("disabled");
					if (!settings.settings_show_disabled) {
						options[i].classList.add("disabled-hidden");
					} else if (!settings.settings_show_disabled_profiles && /^t[0-9]+_/.test(setting)) {
						var trigger_value = settings["mouseover_trigger_key_" + setting.replace(/^(t[0-9]+)_.*/, "$1")];
						if (trigger_value.length <= 0) {
							options[i].classList.add("disabled-hidden");
						}
					}
					var els = options[i].querySelectorAll("input, textarea, button, select");
					for (var j = 0; j < els.length; j++) {
						var input = els[j];
						input.disabled = true;
					}
					var requirements_div = options[i].getElementsByClassName("requirements")[0];
					//requirements_div.style.display = "block";
					requirements_div.classList.remove("hidden");
					fill_requirements(reason_map[setting], requirements_div);
				}
			}
		}