function show_warnings() {
			var options = options_el.querySelectorAll("div.option");
			for (var i = 0; i < options.length; i++) {
				var setting = options[i].id.replace(/^option_/, "");
				var meta = settings_meta[setting];
				if (meta.warning) {
					var warning = meta.warning[settings[setting] + ""];
					var el = options[i].querySelector(".warning");
					if (!el)
						continue;
					if (warning) {
						el.innerText = warning;
						el.style.display = "block";
					} else {
						el.style.display = "none";
					}
				}
			}
		}