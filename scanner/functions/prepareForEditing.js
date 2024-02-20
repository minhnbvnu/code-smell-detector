function prepareForEditing(i, element) {
		var $element = $(element);

		$element.filter(nonVoidBlocksSelector).filter(':empty').remove();

		if ($.browser.msie) {
			// Because even though content edited by Aloha Editor is no longer
			// exported with propping <br>'s that are annotated with
			// "aloha-end-br" classes,  this clean-up still needs to be done for
			// content that was edited using legacy Aloha Editor.
			$element.filter('br.aloha-end-br').remove();

			// Because IE's Trident engine goes against W3C's HTML specification
			// by rendering empty block-level elements with height if they are
			// contentEditable.  Propping <br> elements therefore result in 2
			// lines being displayed rather than 1 (which was the intention of
			// having the propping <br> element is).  Because these empty
			// content editable block-level elements are not rendered invisibly
			// in IE, we can remove the propping <br> in otherwise empty
			// block-level elements.
			$element.filter(blocksSelector).each(removeTrailingBr);
		}

		$element.children(NOT_ALOHA_BLOCK_FILTER).each(prepareForEditing);
	}