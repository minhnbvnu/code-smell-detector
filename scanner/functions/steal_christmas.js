function steal_christmas() {
			let new_theme;
			try {
				localStorage[disable_seasonal_theme_key] = "true";
				new_theme = localStorage[theme_storage_key] || default_theme;
				// eslint-disable-next-line no-empty
			} catch (error) { }
			if (new_theme === "winter.css") {
				new_theme = default_theme;
			}
			set_theme(new_theme);
			button.remove();
			window.removeEventListener("resize", on_zoom_etc);
			document.removeEventListener('touchmove', document_touchmove);
		}