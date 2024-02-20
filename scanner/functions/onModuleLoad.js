function onModuleLoad(){
		if (UI) UI.setInfo(song.title);

		if (song.channels) me.setTrackCount(song.channels);

		prevPatternPos = undefined;
		prevInstrumentIndex = undefined;
		prevPattern = undefined;
		prevSongPosition = undefined;

		me.setCurrentSongPosition(0);
		me.setCurrentPatternPos(0);
		me.setCurrentInstrumentIndex(1);

		me.clearEffectCache();

		EventBus.trigger(EVENT.songLoaded,song);
		EventBus.trigger(EVENT.songPropertyChange,song);
	}