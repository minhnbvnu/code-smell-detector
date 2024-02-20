function makeRemoveFormatButton(formatPlugin, button) {
		return {
			name: button,
			text: i18n.t('button.' + button + '.text'),
			tooltip: i18n.t('button.' + button + '.tooltip'),
			wide: true,
			cls: 'aloha-ui-multisplit-fullwidth',
			click: function () {
				formatPlugin.removeFormat();
			}
		};
	}