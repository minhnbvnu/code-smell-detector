function filterForWaiLangMarkup() {
		var $elem = $(this);
		//IE9 Fix, "lang" value not in dom attributes, use "xml:lang" instead
		return $elem.hasClass(WAI_LANG_CLASS) || $elem.is('[lang]' || $elem.is('[xml\\:lang'));
	}