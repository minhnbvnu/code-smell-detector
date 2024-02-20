function restoreLoop(action){
		if (action.loopStart || action.loopLength){
			currentInstrument.sample.loop.start = action.loopStart || 0;
			currentInstrument.sample.loop.length = action.loopLength || 0;

			ignoreInstrumentChange = true;
			EventBus.trigger(EVENT.instrumentChange,Tracker.getCurrentInstrumentIndex());
			ignoreInstrumentChange = false;
		}
		
	}