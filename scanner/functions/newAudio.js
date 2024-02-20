function newAudio (src) {
	var audio = document.createElement('audio');
	if (src) {
		audio.src = src;
	}
	return audio;
}