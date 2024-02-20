function insertZeroWidthTextNodeFix(block, isGoingLeft) {
		removeZeroWidthTextNodeFix();
		zeroWidthNode = document.createTextNode("\u200b");
		if (isGoingLeft) {
			$(block).after(zeroWidthNode);
		} else {
			$(block).before(zeroWidthNode);
		}
		Aloha.bind('aloha-selection-changed', function (event) {
			removeZeroWidthTextNodeFix();
			Aloha.unbind(event);
		});
		return zeroWidthNode;
	}