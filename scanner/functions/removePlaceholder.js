function removePlaceholder(index, placeholder) {
		var $placeholder = $(placeholder);
		if ($placeholder.hasClass('aloha-editing-div')) {
			removeDivPlaceholder(placeholder);
			return;
		}
		if ($placeholder.hasClass('aloha-editing-p')) {
			removePPlaceholder(placeholder);
			return;
		}
		$placeholder.remove();
	}