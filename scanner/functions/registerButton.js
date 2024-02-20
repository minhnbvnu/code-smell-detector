function registerButton(style, plugin) {
		if(!TextColor.isPluginSupportedStyle(style) || !$.isArray(plugin.config[style])) {
			// config for the style is empty or not set
			return;
		}
		var getSwatchClass = getSwatchClassFn(style, plugin.config[style]);
		var button = generateButton(style, plugin, getSwatchClass);

		ui(style, plugin, button, getSwatchClass);

		Aloha.ready(function () {
			(function prepare(pos) {
				if (pos) {
					var index = pos - 1;
					getOverlay(
						style,
						Aloha.editables[index],
						plugin,
						button,
						getSwatchClass
					);
					setTimeout(function () {
						prepare(index);
					}, 100);
				}
			}(Aloha.editables.length));
		});
	}