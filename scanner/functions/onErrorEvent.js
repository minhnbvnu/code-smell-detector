function onErrorEvent(event) {
	// Extract the shaka.util.Error object from the event.
	onError(event.detail);
}