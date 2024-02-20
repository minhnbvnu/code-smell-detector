function primaryScopeForegroundTab() {
		var tabs = toolbar._tabs,
		    primaryScope = Scopes.getPrimaryScope(),
		    settings,
		    i;
		for (i = 0; i < tabs.length; i++) {
			settings = tabs[i].settings;
			if ('object' === $.type(settings.showOn) && settings.showOn.scope === primaryScope) {
				tabs[i].tab.foreground();
				break;
			}
		}
	}