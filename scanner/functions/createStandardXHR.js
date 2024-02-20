function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}