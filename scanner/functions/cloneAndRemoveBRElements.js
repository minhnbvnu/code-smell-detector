function cloneAndRemoveBRElements(node) {
		var clone = jQuery(node).clone();
		clone.find('br').remove();
		return clone[0];
	}