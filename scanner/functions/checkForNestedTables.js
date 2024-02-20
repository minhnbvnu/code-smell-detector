function checkForNestedTables($element) {
		var selector = $element.is('table') ? 'table' : 'table table';
		if ($element.find(selector).length) {
			Console.warn('Table Plugin',
					'Nested tables found. They will not be initialized.');
			return true;
		}
		return false;
	}