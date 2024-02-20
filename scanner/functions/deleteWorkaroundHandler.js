function deleteWorkaroundHandler(event) {
		if (8/*backspace*/ != event.keyCode && 46/*del*/ != event.keyCode) {
			return false;
		}

		var rangeObj = Aloha.getSelection().getRangeAt(0);
		var startContainer = rangeObj.startContainer;

		//the hack is only relevant if after the deletion has been
		//performed we are inside a li of a nested list
		var $nestedList = jQuery(startContainer).closest('ul, ol, dl');
		if ( ! $nestedList.length ) {
			return false;
		}
		var $parentList = $nestedList.parent().closest('ul, ol, dl');
		if ( ! $parentList.length ) {
			return false;
		}

		var ranges = Aloha.getSelection().getAllRanges();

		var actionPerformed = false;
		$parentList.each(function () {
			actionPerformed = actionPerformed || fixListNesting(jQuery(this));
		});

		if (actionPerformed) {
			Aloha.getSelection().setRanges(ranges);
			for (var i = 0; i < ranges.length; i++) {
				ranges[i].detach();
			}
		}

		return actionPerformed;
	}