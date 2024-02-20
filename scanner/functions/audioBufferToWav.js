function audioBufferToWav (buffer, opt) {
	opt = opt || {};

	var numChannels = buffer.numberOfChannels;
	var sampleRate = buffer.sampleRate;
	var format = opt.float32 ? 3 : 1;
	var bitDepth = format === 3 ? 32 : 16;


	function interleave (inputL, inputR) {
		var length = inputL.length + inputR.length;
		var interleaveResult = new Float32Array(length);

		var index = 0;
		var inputIndex = 0;

		while (index < length) {
			interleaveResult [index++] = inputL[inputIndex];
			interleaveResult [index++] = inputR[inputIndex];
			inputIndex++
		}
		return interleaveResult;
	}

	var result;
	if (numChannels === 2) {
		result = interleave(buffer.getChannelData(0), buffer.getChannelData(1))
	} else {
		result = buffer.getChannelData(0)
	}

	return encodeWAV(result, format, sampleRate, numChannels, bitDepth);

}