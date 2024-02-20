function getOverlay(style, editable, plugin, button, getSwatchClass) {
		// Because each editable may have its own configuration and therefore
		// each may have its own overlay.
		var config = plugin.getEditableConfig(editable.obj);
		if (!config[style] || config[style].length < 1) {
			return null;
		}
		if(!overlays[style]) {
			overlays[style] = {};
		}
		var id = editable.getId();
		var overlay = overlays[style][id];
		if (!overlay) {
			overlay = new Overlay(
				generateSwatches(style, config[style], getSwatchClass),
				function (swatch) { onSelect(style, swatch, rangeAtOpen); },
				button.element[0]
			);
			overlay.$element
			       .addClass('aloha-ui-textcolor-picker-overlay-' + style)
			       .addClass('aloha-ui-textcolor-picker-overlay')
			       .css('position', Floating.POSITION_STYLE);
			overlays[id] = overlay;
		}
		return overlay;
	}