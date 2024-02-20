function currenttab_is_image() {
		return contenttype_can_be_redirected(document.contentType);
	}