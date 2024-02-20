function updateWaiImage(tablePlugin) {
		var $element = $(tablePlugin.summary.getInputElem()),
			waiRed = tablePlugin.activeTable.get('waiRed'),
			waiGreen = tablePlugin.activeTable.get('waiGreen');

		$element.removeClass(waiRed + ' ' + waiGreen);
		if (tablePlugin.activeTable.checkWai()) {
			$element.addClass(waiGreen);
		}
		else {
			$element.addClass(waiRed);
		}
	}