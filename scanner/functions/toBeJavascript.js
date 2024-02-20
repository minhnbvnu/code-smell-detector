function toBeJavascript(expected) {
	try {
		babylon.parse(this.actual);
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
}