function applyEffects(track,time){

		var trackNote = trackNotes[track];
		var effects = trackNote.effects;

		if (!trackNote) return;
		if (!effects) return;

		var value;
		var autoVibratoHandled = false;

        trackNote.startVibratoTimer = trackNote.vibratoTimer||0;

        if (trackNote.resetPeriodOnStep && trackNote.source){
			// vibrato or arpeggio is done
			// for slow vibratos it seems logical to keep the current frequency, but apparently most trackers revert back to the pre-vibrato one
			var targetPeriod = trackNote.currentPeriod || trackNote.startPeriod;
			me.setPeriodAtTime(trackNote,targetPeriod,time);
			trackNote.resetPeriodOnStep = false;
		}

		if (effects.volume){
			var volume = effects.volume.value;
			if (trackNote.volume){
				//trackNote.startVolume = volume; // apparently the startVolume is not set here but the default volume of the note is used?
				trackNote.volume.gain.setValueAtTime(volume/100,time);
			}
			trackNote.currentVolume = volume;
		}

		if (effects.panning){
			value = effects.panning.value;
			if (value === 255) value = 254;
			if (trackNote.panning){
				trackNote.panning.pan.setValueAtTime((value-127)/127,time);
			}
		}

		if (effects.fade){
			value = effects.fade.value;
			var currentVolume;
			var startTick = 1;

			if (effects.fade.resetOnStep){
				currentVolume = trackNote.startVolume;
			}else{
				currentVolume = trackNote.currentVolume;
			}

			var steps = ticksPerStep;
			if (effects.fade.fine){
				// fine Volume Up or Down
				startTick = 0;
				steps = 1;
			}

			for (var tick = startTick; tick < steps; tick++){
				if (trackNote.volume){
					trackNote.volume.gain.setValueAtTime(currentVolume/100,time + (tick*tickTime));
					currentVolume += value;
					currentVolume = Math.max(currentVolume,0);
					currentVolume = Math.min(currentVolume,100);
				}
			}

			trackNote.currentVolume = currentVolume;

		}

		if (effects.slide){

			if (trackNote.source){
				var currentPeriod = trackNote.currentPeriod || trackNote.startPeriod;
				var targetPeriod = currentPeriod;


				var steps = ticksPerStep;
				if (effects.slide.fine){
					// fine Slide Up or Down
					steps = 2;
				}

				var slideValue = effects.slide.value;
				if (me.inFTMode() && me.useLinearFrequency) slideValue = effects.slide.value*4;
				value = Math.abs(slideValue);

				//console.error(currentPeriod,slideValue);

				if (me.inFTMode() && effects.slide.resetVolume && (trackNote.volumeFadeOut || trackNote.volumeEnvelope)){
					// crap ... this should reset the volume envelope to the beginning ... annoying ...
					var instrument = me.getInstrument(trackNote.instrumentIndex);
					if (instrument) instrument.resetVolume(time,trackNote);

				}

                trackNote.vibratoTimer = trackNote.startVibratoTimer;

				// TODO: Why don't we use a RampToValueAtTime here ?
				for (var tick = 1; tick < steps; tick++){
					if (effects.slide.target){
						trackEffectCache[track].defaultSlideTarget = effects.slide.target;
						if (targetPeriod<effects.slide.target){
							targetPeriod += value;
							if (targetPeriod>effects.slide.target) targetPeriod = effects.slide.target;
						}else{
							targetPeriod -= value;
							if (targetPeriod<effects.slide.target) targetPeriod = effects.slide.target;
						}
					}else{
						targetPeriod += slideValue;
						if (trackEffectCache[track].defaultSlideTarget) trackEffectCache[track].defaultSlideTarget += slideValue;
					}

					if (!me.inFTMode()) targetPeriod = Audio.limitAmigaPeriod(targetPeriod);

					var newPeriod = targetPeriod;
					if (effects.slide.canUseGlissando && trackEffectCache[track].glissando){
						newPeriod = Audio.getNearestSemiTone(targetPeriod,trackNote.instrumentIndex);
					}

					//console.error("***");
					//console.error(targetPeriod);

					if (targetPeriod !== trackNote.currentPeriod){
						trackNote.currentPeriod = targetPeriod;

                        if (trackNote.hasAutoVibrato && me.inFTMode()){
                            targetPeriod = applyAutoVibrato(trackNote,newPeriod);
                            autoVibratoHandled = true;
                        }
						me.setPeriodAtTime(trackNote,newPeriod,time + (tick*tickTime));

					}
				}
			}
		}

		if (effects.arpeggio){
			if (trackNote.source){

				var currentPeriod = trackNote.currentPeriod || trackNote.startPeriod;
				var targetPeriod;

				trackNote.resetPeriodOnStep = true;
                trackNote.vibratoTimer = trackNote.startVibratoTimer;

				for (var tick = 0; tick < ticksPerStep; tick++){
					var t = tick%3;

					if (t == 0) targetPeriod = currentPeriod;
					if (t == 1 && effects.arpeggio.interval1) targetPeriod = currentPeriod - effects.arpeggio.interval1;
					if (t == 2 && effects.arpeggio.interval2) targetPeriod = currentPeriod - effects.arpeggio.interval2;

                    if (trackNote.hasAutoVibrato && me.inFTMode()){
                        targetPeriod = applyAutoVibrato(trackNote,targetPeriod);
                        autoVibratoHandled = true;
                    }

                    me.setPeriodAtTime(trackNote,targetPeriod,time + (tick*tickTime));

				}
			}
		}

		if (effects.vibrato || (trackNote.hasAutoVibrato && !autoVibratoHandled)){
            effects.vibrato = effects.vibrato || {freq:0,amplitude:0};
			var freq = effects.vibrato.freq;
			var amp = effects.vibrato.amplitude;
			if (me.inFTMode() && me.useLinearFrequency) amp *= 4;

			trackNote.vibratoTimer = trackNote.vibratoTimer||0;

			if (trackNote.source) {
				trackNote.resetPeriodOnStep = true;
				currentPeriod = trackNote.currentPeriod || trackNote.startPeriod;

                trackNote.vibratoTimer = trackNote.startVibratoTimer;
				for (var tick = 0; tick < ticksPerStep; tick++) {
					targetPeriod = vibratoFunction(currentPeriod,trackNote.vibratoTimer,freq,amp);

					// should we add or average the 2 effects?
					if (trackNote.hasAutoVibrato && me.inFTMode()){
                        targetPeriod = applyAutoVibrato(trackNote,targetPeriod);
                        autoVibratoHandled = true;
					}else{
                        trackNote.vibratoTimer++;
					}

					// TODO: if we ever allow multiple effect on the same tick then we should rework this as you can't have concurrent "setPeriodAtTime" commands
					me.setPeriodAtTime(trackNote,targetPeriod,time + (tick*tickTime));

				}
			}
		}

		if (effects.tremolo){
			var freq = effects.tremolo.freq;
			var amp = effects.tremolo.amplitude;

			trackNote.tremoloTimer = trackNote.tremoloTimer||0;

			if (trackNote.volume) {
				var _volume = trackNote.startVolume;

				for (var tick = 0; tick < ticksPerStep; tick++) {

					_volume = tremoloFunction(_volume,trackNote.tremoloTimer,freq,amp);

					if (_volume<0) _volume=0;
					if (_volume>100) _volume=100;

					trackNote.volume.gain.setValueAtTime(_volume/100,time + (tick*tickTime));
					trackNote.currentVolume = _volume;
					trackNote.tremoloTimer++;
				}
			}

		}

		if (effects.cutNote){
			if (trackNote.volume) {
				trackNote.volume.gain.setValueAtTime(0,time + (effects.cutNote.value*tickTime));
			}
			trackNote.currentVolume = 0;
		}

		if (effects.noteOff){
			var instrument = me.getInstrument(trackNote.instrumentIndex);
			if (instrument){
				trackNote.currentVolume = instrument.noteOff(time + (effects.noteOff.value*tickTime),trackNote);
			}
		}

		if (effects.reTrigger){
			var instrumentIndex = trackNote.instrumentIndex;
			var notePeriod = trackNote.startPeriod;
			volume = trackNote.startVolume;
			var noteIndex = trackNote.noteIndex;

			var triggerStep = effects.reTrigger.value || 1;
			var triggerCount = triggerStep;
			while (triggerCount<ticksPerStep){
				var triggerTime = time + (triggerCount * tickTime);
				cutNote(track,triggerTime);
				trackNotes[track] = Audio.playSample(instrumentIndex,notePeriod,volume,track,effects,triggerTime,noteIndex);
				triggerCount += triggerStep;
			}
		}

	}