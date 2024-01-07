function emitEvent(eventName) {
	var evt = new CustomEvent(eventName, {'bubbles': true, 'cancelable': true});
	document.dispatchEvent(evt);
}