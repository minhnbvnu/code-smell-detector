function removeDivPlaceholder(placeholder) {
		var $placeholder = $(placeholder);
		var child = placeholder.firstChild;

		if (!child) {
			$placeholder.remove();
			return;
		}

		if (!Dom.isTextNode(child) || child.data.indexOf('\u00A0') === -1) {
			child = placeholder.lastChild;
		}

		if (Dom.isTextNode(child)) {
			child.data = child.data.replace(/(^(\u00A0)+)|((\u00A0)+$)/g, '');
		}

		if (!$placeholder.is(':empty')) {
			Dom.removeShallow(placeholder);
		} else {
			$placeholder.remove();
		}
	}