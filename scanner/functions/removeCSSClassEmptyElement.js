function removeCSSClassEmptyElement(node) {
		jQuery(node).find('.'  + EMPTY_ELEMENT_CSS_CLASS)
		            .removeClass(EMPTY_ELEMENT_CSS_CLASS);
	}