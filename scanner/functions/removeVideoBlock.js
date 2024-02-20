function removeVideoBlock() {
		if (selectedBlock) {
			selectedBlock.$element[0].remove();
		}
	}