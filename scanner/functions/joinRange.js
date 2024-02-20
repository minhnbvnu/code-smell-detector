function joinRange(parts){
		currentSampleData = parts.head.concat(parts.range).concat(parts.tail);
		currentInstrument.sample.data = currentSampleData;
		currentInstrument.sample.length = currentSampleData.length;
		ignoreInstrumentChange = true;
		EventBus.trigger(EVENT.instrumentChange,Tracker.getCurrentInstrumentIndex());
		ignoreInstrumentChange = false;
		waveformDisplay.refresh();
		me.refresh();
	}