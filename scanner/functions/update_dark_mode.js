function update_dark_mode() {
		if (!is_maxurl_website && !is_options_page) {
			return;
		}
		if (prefers_dark_mode()) {
			set_default_value("dark_mode", true);
		}
		if (settings.dark_mode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}