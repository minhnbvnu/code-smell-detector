function unformatList(range){
		expandRange(range);

		var cac = range.commonAncestorContainer;

		if (!isListElement(cac)){
			return;
		}

		if (!isEntireNodeInRange(range) && !spansMultipleLists(range)) {
			return;
		}

		var selectedNodes = jQuery(range.startContainer.parentNode).nextUntil(jQuery(range.endContainer.parentNode).next()).andSelf();
		var prevNodes = jQuery(range.startContainer.parentNode).prevAll();
		var nextNodes = jQuery(range.endContainer.parentNode).nextAll();
		var listName = range.startContainer.parentNode.parentNode.nodeName;

		// first list item
		if (selectedNodes.length === 1 && prevNodes.length === 0) {
			selectedNodes.each(function(){
				jQuery(this).addClass('_moved');
			}).remove().insertBefore(nextNodes.parent());
		}
		// last list item
		else if (selectedNodes.length === 1 && nextNodes.length === 0) {
			selectedNodes.each(function(){
				jQuery(this).addClass('_moved');
			}).remove().insertAfter(prevNodes.parent());
		}
		// one list item in middle
		else if (selectedNodes.length === 1 && nextNodes.length > 1) {
			selectedNodes.each(function(){
				jQuery(this).addClass('_moved');
			}).remove().insertAfter(prevNodes.parent());
			jQuery('<' + listName.toLowerCase() + '>').append(nextNodes).insertAfter(jQuery(range.endContainer));
		}
		// multiple list items up to whole list
		else {
			selectedNodes.each(function(){
				jQuery(this).addClass('_moved');
			}).remove().insertAfter(cac);
			if (nextNodes.length > 0) {
				jQuery('<' + listName.toLowerCase() + '>').append(nextNodes).insertAfter(jQuery(range.endContainer));
			}
		}


		// unwrap moved list elements
		jQuery('._moved').each(function() {
			jQuery(this).contents().unwrap().wrap('<p>');
		});


		// If we are at the first list element, get rid of original (now empty) list
		if (prevNodes.length === 0) {
			cac.remove();
		}
	}