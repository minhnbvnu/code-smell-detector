function onLinkHandler(e) {
	if (e.url === 'mylink://show/alert') {
		alert("The 'onLinkHandler' callback was invoked.");
		return false;
	}
	return true;
}