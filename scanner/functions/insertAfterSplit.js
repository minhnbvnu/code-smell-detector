function insertAfterSplit(head, element) {
		if (head.nodeType !== Node.TEXT_NODE && isPhantomNode(head)) {
			jQuery(head).replaceWith(element);
		} else {
			jQuery(head).after(element);
		}
	}