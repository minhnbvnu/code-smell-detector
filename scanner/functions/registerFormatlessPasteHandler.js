function registerFormatlessPasteHandler(plugin, config) {
		ContentHandlerManager.register('formatless', FormatlessPasteHandler);
		FormatlessPasteHandler.strippedElements = config.strippedElements || Html.TEXT_LEVEL_SEMANTIC_ELEMENTS;

		plugin._toggleFormatlessPasteButton =
			Ui.adopt('toggleFormatlessPaste', ToggleButton, {
				tooltip : i18n.t('button.formatlessPaste.tooltip'),
				icon    : 'aloha-icon aloha-icon-formatless-paste',
				scope   : 'Aloha.continuoustext',
				click   : function () {
					// Toggle the value of allowFormatless
					FormatlessPasteHandler.enabled =
						!FormatlessPasteHandler.enabled;
				}
			});

		plugin._toggleFormatlessPasteButton.show(plugin.button);

		if (true === plugin.formatlessPasteOption) {
			plugin._toggleFormatlessPasteButton.setState(true);
			FormatlessPasteHandler.enabled = true;
		} else if (false === plugin.formatlessPasteOption) {
			plugin._toggleFormatlessPasteButton.setState(false);
			FormatlessPasteHandler.enabled = false;
		}
	}