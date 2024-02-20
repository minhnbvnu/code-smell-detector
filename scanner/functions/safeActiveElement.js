function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}