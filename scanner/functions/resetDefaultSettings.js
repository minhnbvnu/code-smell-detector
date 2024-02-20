function resetDefaultSettings(){
		EventBus.trigger(EVENT.songBPMChangeIgnored,0);
		EventBus.trigger(EVENT.songSpeedChangeIgnored,0);
		me.setAmigaSpeed(6);
		me.setBPM(125);

		vibratoFunction = Audio.waveFormFunction.sine;
		tremoloFunction = Audio.waveFormFunction.sine;

		trackEffectCache = [];
		trackNotes = [];
		for (var i=0;i<trackCount;i++){
			trackNotes.push({});
			trackEffectCache.push({});
		}
		me.useLinearFrequency = false;
		me.setTrackerMode(TRACKERMODE.PROTRACKER,true);
		if (!me.isPlugin) Audio.setMasterVolume(1);
		Audio.setAmigaLowPassFilter(false,0);
		if (typeof StateManager !== "undefined") StateManager.clear();
	}