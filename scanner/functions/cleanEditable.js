function cleanEditable($editable) {
		eachBlock($editable, function (block, blockElem) {
			cleanBlock(block, blockElem);
		});
	}