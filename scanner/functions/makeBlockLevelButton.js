function makeBlockLevelButton(formatPlugin, button) {
		return {
			name: button,
			tooltip: i18n.t('button.' + button + '.tooltip'),
			iconClass: 'aloha-icon ' + i18n.t('aloha-large-icon-' + button),
			markup: jQuery('<' + button + '>'),
			click: function () {
				return blockLevelButtonClickHandler(formatPlugin, button);
			}
		};
	}