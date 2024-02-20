function generateOverlay(characterpicker, editable) {
		var config = characterpicker.getEditableConfig(editable.obj);
		if (!config) {
			return null;
		}
		var characters = $.isArray(config) ? config.join(' ') : config;
		var overlay = configs[characters];
		if (!overlay) {
			overlay = new Overlay(onSelectCharacter);
			generateCharacterTable(overlay, characters);
			configs[characters] = overlay;
		}
		return overlay;
	}