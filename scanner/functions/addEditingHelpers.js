function addEditingHelpers($field) {
		// check whether the editable contains a non-editable block
		// element. as first or last element (not counting whitespace
		// nodes) if so, we need to add br's at the end and/or start so
		// that the user could enter text. Note that inline blocks
		// will be padded by the block plugin, so we ignore them here.
		var firstChild = Dom.getFirstVisibleChild($field[0], false, ["TABLE"]);
		var $firstChild = jQuery(firstChild);

		if (Dom.isBlockNode(firstChild)
				&& (!$firstChild.contentEditable() || firstChild.nodeName === 'TABLE')) {
			var startP = jQuery('<p class="aloha-editing-p"></p>');

			$field.prepend(startP);

			if (0 === Dom.getOffsetHeight(startP[0])) {
				startP.append(jQuery('<br class="aloha-end-br"/>'));
			}
		}

		var lastChild = Dom.getLastVisibleChild($field[0], false, ["TABLE"]);
		var $lastChild = jQuery(lastChild);

		if (Dom.isBlockNode(lastChild)
				&& (!jQuery(lastChild).contentEditable() || lastChild.nodeName === 'TABLE')) {
			var endP = jQuery('<p class="aloha-editing-p"></p>');

			$field.append(endP);
			if (0 === Dom.getOffsetHeight(endP[0])) {
				endP.append(jQuery('<br class="aloha-end-br"/>'));
			}
		}
	}