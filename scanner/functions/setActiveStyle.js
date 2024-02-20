function setActiveStyle(selectedCells, config, items, button) {
		var className;
		var allSelected = false;

		// activate all formatting buttons
		for (var i = 0; i < items.length; i++) {
			button.showItem(items[i].name);
		}

		// clear active style block
		button.setActiveItem();

		// select class of first element as reference
		for (var i = 0; i < config.length; i++) {
			if (jQuery(selectedCells[0]).hasClass(config[i].cssClass)) {
				allSelected = true;
				className = config[i].name;
				break;
			}
		}

		// if all selected cells have the same class, set it as active
		jQuery(selectedCells).each(function(index) {
			if (!jQuery(this).hasClass(className)) {
				allSelected = false;
			}
		});
		if (allSelected) {
			button.setActiveItem(className);
		}
	}