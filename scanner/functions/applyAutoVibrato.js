function applyAutoVibrato(trackNote,currentPeriod){

        var instrument = me.getInstrument(trackNote.instrumentIndex);
        if (instrument){
            var _freq = -instrument.vibrato.rate/40;
            var _amp = instrument.vibrato.depth/8;
            if (me.useLinearFrequency) _amp *= 4;
            trackNote.vibratoTimer = trackNote.vibratoTimer||0;

            if (instrument.vibrato.sweep && trackNote.vibratoTimer<instrument.vibrato.sweep){
                var sweepAmp = 1-((instrument.vibrato.sweep-trackNote.vibratoTimer)/instrument.vibrato.sweep);
                _amp *= sweepAmp;
            }
            var instrumentVibratoFunction = instrument.getAutoVibratoFunction();
            var targetPeriod = instrumentVibratoFunction(currentPeriod,trackNote.vibratoTimer,_freq,_amp);
            trackNote.vibratoTimer++;
            return targetPeriod
        }
        return currentPeriod;
	}