function decodeFileWithAudioContext(file,sample,next){
	// need to use original samplerate, not the one defined in users OS/Browser
	Audio.converter = new AudioContext( {sampleRate: sample.info.sampleRate} );
	if (Audio.converter.sampleRate !== sample.info.sampleRate) {
		console.log('Could not initiate desired sampleRate of '+ sample.info.sampleRate +' instead got '+ Audio.converter.sampleRate);
	}
	Audio.converter.decodeAudioData(
			file.buffer,
			function(buffer) {
				if (!buffer) {
					alert('error decoding file data: ' + url);
					return;
				}
				// todo: show dialog for stereo samples ?
				sample.data = buffer.getChannelData(0);
				if (sample.data && !sample.data.concat){
					// typed arrays don't have the concat method
					sample.data = Array.from(sample.data);
				}
				sample.length = buffer.length;
				if (next) next();
			},
			function(error) {
				console.error('decodeAudioData error', error);
				if (next) next();
			}
	);
}