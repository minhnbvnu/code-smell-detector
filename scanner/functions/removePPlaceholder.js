function removePPlaceholder(placeholder) {
		var $placeholder = $(placeholder);
		if (isUnmodifiedAlohaEditingP(placeholder)) {
			$placeholder.remove();
		} else {
			$placeholder.removeClass('aloha-editing-p');
			$placeholder.removeClass('aloha-placeholder');
			if (Browser.ie) {
				//remove trailing or leading word joiner
				var child = $placeholder[0].firstChild;
				if (child && Dom.isTextNode(child) && child.data.indexOf('\u2060') >= -1) {
					child.data = child.data.replace(/(^(\u2060)+)|((\u2060)+$)/g, '');
				}
			}
		}
	}