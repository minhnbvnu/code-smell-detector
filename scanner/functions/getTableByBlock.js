function getTableByBlock($block) {
		return isTable($block) ? $block.find('table').filter(':first') : null;
	}