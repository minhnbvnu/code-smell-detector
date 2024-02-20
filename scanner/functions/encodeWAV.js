function encodeWAV (samples, format, sampleRate, numChannels, bitDepth) {


	var bytesPerSample = bitDepth / 8;
	var blockAlign = numChannels * bytesPerSample;

	var bufferLength = 44 + samples.length * bytesPerSample;

	var buffer = new ArrayBuffer(bufferLength);
	var view = new DataView(buffer);

	/* RIFF identifier */
	writeString(view, 0, 'RIFF');
	/* RIFF chunk length */
	view.setUint32(4, 36 + samples.length * bytesPerSample, true);
	/* RIFF type */
	writeString(view, 8, 'WAVE');
	/* format chunk identifier */
	writeString(view, 12, 'fmt ');
	/* format chunk length */
	view.setUint32(16, 16, true);
	/* sample format (raw) */
	view.setUint16(20, format, true);
	/* channel count */
	view.setUint16(22, numChannels, true);
	/* sample rate */
	view.setUint32(24, sampleRate, true);
	/* byte rate (sample rate * block align) */
	view.setUint32(28, sampleRate * blockAlign, true);
	/* block align (channel count * bytes per sample) */
	view.setUint16(32, blockAlign, true);
	/* bits per sample */
	view.setUint16(34, bitDepth, true);
	/* data chunk identifier */
	writeString(view, 36, 'data');
	/* data chunk length */
	view.setUint32(40, samples.length * bytesPerSample, true);

	var offset = 44;
	var i;

	if (format === 1) { // Raw PCM
		for (i = 0; i < samples.length; i++, offset += 2) {
			var s = Math.max(-1, Math.min(1, samples[i]));
			view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
		}
	} else {

		for (i = 0; i < samples.length; i++, offset += 4) {
			view.setFloat32(offset, samples[i], true)
		}
	}

	function writeString (view, offset, string) {
		for (var i = 0; i < string.length; i++) {
			view.setUint8(offset + i, string.charCodeAt(i))
		}
	}

	return buffer
}