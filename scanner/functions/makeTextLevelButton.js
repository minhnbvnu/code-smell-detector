function makeTextLevelButton(formatPlugin, button) {
		var command = commandsByElement[button];
		var componentName = command;
		if (componentNameByElement.hasOwnProperty(button)) {
			componentName = componentNameByElement[button];
		}
		var component = Ui.adopt(componentName, ToggleButton, {
			tooltip : i18n.t('button.' + button + '.tooltip'),
			icon: 'aloha-icon aloha-icon-' + componentName,
			scope: 'Aloha.continuoustext',
			click: function () {
				return textLevelButtonClickHandler(formatPlugin, button);
			}
		});
		return component;
	}