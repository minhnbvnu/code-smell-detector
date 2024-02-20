function toggleListOption(plugin, listtype, show) {
		switch (listtype) {
		case 'ul':
			if (plugin.templates.ul) {
				plugin._unorderedListFormatSelectorButton.show(show);
			}
			break;
		case 'ol':
			if (plugin.templates.ol) {
				plugin._orderedListFormatSelectorButton.show(show);
			}
			break;
		case 'dl':
			if (plugin.templates.dl) {
				plugin._definitionListFormatSelectorButton.show(show);
			}
			break;
		}
	}