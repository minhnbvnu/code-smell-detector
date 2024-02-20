function isFloatingEnabled() {
		return !Aloha.settings
			|| !Aloha.settings.toolbar
			|| Aloha.settings.toolbar.floating !== false;
	}