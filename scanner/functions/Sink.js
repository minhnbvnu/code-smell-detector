function Sink (readFn, channelCount, bufferSize, sampleRate) {
	var	sinks	= Sink.sinks.list,
		i;
	for (i=0; i<sinks.length; i++) {
		if (sinks[i].enabled) {
			try {
				return new sinks[i](readFn, channelCount, bufferSize, sampleRate);
			} catch(e1){}
		}
	}

	throw Sink.Error(0x02);
}