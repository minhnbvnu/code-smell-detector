async function initPlayer() {
	// Create a Player instance.
	const video = document.getElementById('video');
	const player = new shaka.Player(video);

	// Attach player to the window to make it easy to access in the JS console.
	window.player = player;

	// Listen for error events.
	player.addEventListener('error', onErrorEvent);

	// Try to load a manifest.
	// This is an asynchronous process.
	try {
		await player.load(manifestUri);
		// This runs if the asynchronous load is successful.
		console.log('The video has now been loaded!');
	} catch (e) {
		// onError is executed if the asynchronous load fails.
		onError(e);
	}
}