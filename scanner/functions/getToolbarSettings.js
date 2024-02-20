function getToolbarSettings() {
		var userSettings = Aloha.settings.toolbar,
		    defaultSettings = Settings.defaultToolbarSettings;
		if (!userSettings) {
			return defaultSettings.tabs;
		}
		return Settings.combineToolbarSettings(
			userSettings.tabs || [],
			defaultSettings.tabs,
			userSettings.exclude || []
		);
	}