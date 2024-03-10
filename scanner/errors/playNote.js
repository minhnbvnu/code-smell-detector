function playNote(note,track,time,songPos){

		var defaultVolume = 100;
		var trackEffects = {};

		var instrumentIndex = note.instrument;
		var notePeriod = note.period;
		var noteIndex = note.index;


		if (notePeriod && !instrumentIndex){
			// reuse previous instrument
			instrumentIndex = trackNotes[track].currentInstrument;
			defaultVolume = typeof trackNotes[track].currentVolume === "number" ? trackNotes[track].currentVolume : defaultVolume;

			if (SETTINGS.emulateProtracker1OffsetBug && instrumentIndex && trackEffectCache[track].offset){
				if (trackEffectCache[track].offset.instrument === instrumentIndex){
					console.log("applying instrument offset cache to instrument " + instrumentIndex);
					trackEffects.offset = trackEffectCache[track].offset;
				}
			}
		}


		if (typeof note.instrument === "number"){
			instrument = me.getInstrument(note.instrument);
			if (instrument) {
				defaultVolume = 100 * (instrument.sample.volume/64);

				if (SETTINGS.emulateProtracker1OffsetBug){
					// reset instrument offset when a instrument number is present;
					trackEffectCache[track].offset = trackEffectCache[track].offset || {};
					trackEffectCache[track].offset.value = 0;
					trackEffectCache[track].offset.instrument = note.instrument;
				}
			}
		}



		var volume = defaultVolume;
		var doPlayNote = true;


		if (typeof instrumentIndex === "number"){
			instrument = me.getInstrument(instrumentIndex);
		}


		if (noteIndex && me.inFTMode()){

			if (noteIndex === 97) {
				noteIndex = NOTEOFF;
			}

			if (noteIndex === NOTEOFF){
				var offInstrument = instrument || me.getInstrument(trackNotes[track].currentInstrument);
				if (offInstrument){
					volume = offInstrument.noteOff(time,trackNotes[track]);
				}else{
					console.log("no instrument on track " + track);
					volume = 0;
				}
				defaultVolume = volume;
				doPlayNote = false;
			}else{

				if (instrument){
					instrument.setSampleForNoteIndex(noteIndex);

					if (instrument.sample.relativeNote) noteIndex += instrument.sample.relativeNote;
					// TODO - check of note gets out of range
					// but apparently they still get played ... -> extend scale to 9, 10 or 11 octaves ?
					// see jt_letgo.xm instrument 6 (track 20) for example
				}

				if (me.useLinearFrequency){
					notePeriod = 7680 - (noteIndex-1)*64;
				}else{
					var ftNote = FTNotes[noteIndex];
					if (ftNote) notePeriod = ftNote.period;
				}
			}
		}


		var value = note.param;
		var x,y;

		var result = {};

        if (note.volumeEffect && me.inFTMode()){
        	var ve = note.volumeEffect;
            x = ve >> 4;
			y = ve & 0x0f;

            if (ve>15 && ve<=80){
                volume = ((ve-16)/64)*100;
                defaultVolume = volume;

				// note this is not relative to the default instrument volume but sets the instrument volume
				trackEffects.volume = {
					value: volume
				};
            }else{

            	switch(x){
					case 6:
						// volume slide down
                        trackEffects.fade = {
                            value: y * -1 * 100/64
                        };
						break;
					case 7:
						// volume slide up
                        trackEffects.fade = {
                            value: y * 100/64
                        };
						break;
					case 8:
						// Fine volume slide down
						trackEffects.fade = {
							value: -y * 100/64,
							fine: true
						};
						break;
					case 9:
						// Fine volume slide up
						trackEffects.fade = {
							value: y * 100/64,
							fine: true
						};
						break;
					case 10:
						// set vibrato speed
						console.warn("set vibrato speed not implemented");
						break;
					case 11:
						// Vibrato
						console.warn("Vibrato not implemented");
						break;
					case 12:
						// Set panning
						trackEffects.panning = {
							value: (ve-192)*17,
							slide: false
						};
						break;
					case 13:
						// Panning slide left
						console.warn("Panning slide left not implemented - track " + track);
						trackEffects.panning = {
							value: ve,
							slide: true
						};
						break;
					case 14:
						// Panning slide right
						console.warn("Panning slide right not implemented - track " + track);
						break;
					case 15:
						// Tone porta
						console.warn("Tone Porta not implemented");
						break;
				}
			}

        }

		switch(note.effect){
			case 0:
				// Arpeggio
				if (value){
					x = value >> 4;
					y = value & 0x0f;


					var finetune = 0;


					//todo: when a instrument index is present other than the previous index, but no note
					// how does this work?
					// see example just_about_seven.mod

                    instrument = instrument || me.getInstrument(trackNotes[track].currentInstrument);

					if (me.inFTMode()){
                        if (instrument){
							var _noteIndex = noteIndex || trackNotes[track].noteIndex;
							var root = instrument.getPeriodForNote(_noteIndex,true);
                            if (noteIndex === NOTEOFF) {
                                trackEffects.arpeggio = trackEffectCache[track].arpeggio;
                            }else{
                                trackEffects.arpeggio = {
                                    root: root,
                                    interval1: root - instrument.getPeriodForNote(_noteIndex+x,true),
                                    interval2: root - instrument.getPeriodForNote(_noteIndex+y,true),
                                    step:1
                                };

                                trackEffectCache[track].arpeggio = trackEffects.arpeggio
							}
                        }
					}else{
                        root = notePeriod || trackNotes[track].startPeriod;
                        // check if the instrument is finetuned
                        if (instrument){
                            finetune = instrument.getFineTune();
                            if (finetune) root = Audio.getFineTuneForPeriod(root,finetune);
                        }

                        trackEffects.arpeggio = {
                            root: root,
                            interval1: root-Audio.getSemiToneFrom(root,x,finetune),
                            interval2: root-Audio.getSemiToneFrom(root,y,finetune),
                            step:1
                        };
					}


				}

				// set volume, even if no effect present
				// note: this is consistent with the Protracker 3.15 and later playback
				// on Protracker 2.3 and 3.0, the volume effect seems much bigger - why ? (see "nugget - frust.mod")
				if (note.instrument){
					trackEffects.volume = {
						value: defaultVolume
					};
				}

				break;
			case 1:
				// Slide Up
				value = value * -1;

				// note: on protracker 2 and 3 , the effectcache is NOT used on this effect
				// it is on Milkytracker (in all playback modes)

				if (me.inFTMode()){
					if (!value && trackEffectCache[track].slideUp) value = trackEffectCache[track].slideUp.value;
				}

				trackEffects.slide = {
					value: value
				};
				trackEffectCache[track].slideUp = trackEffects.slide;
				break;
			case 2:
				// Slide Down

				// note: on protracker 2 and 3 , the effectcache is NOT used on this effect
				// it is on Milkytracker (in all playback modes)

				if (me.inFTMode()){
					if (!value && trackEffectCache[track].slideDown) value = trackEffectCache[track].slideDown.value;
				}

				trackEffects.slide = {
					value: value
				};
				trackEffectCache[track].slideDown = trackEffects.slide;
				break;
			case 3:
				// Slide to Note - if there's a note provided, it is not played directly,
				// if the instrument number is set, the default volume of that instrument will be set

				// if value == 0 then the old slide will continue

				doPlayNote = false;
				// note: protracker2 switches samples on the fly if the instrument index is different from the previous instrument ...
				// Should we implement that?
				// fasttracker does not.
				// protracker 3 does not
				// milkytracker tries, but not perfect
				// the ProTracker clone of 8bitbubsy does this completely compatible to protracker2.

				var target = notePeriod;
				if (me.inFTMode() && noteIndex === NOTEOFF) target = 0;

				// avoid using the fineTune of another instrument if another instrument index is present
				if (trackNotes[track].currentInstrument) instrumentIndex = trackNotes[track].currentInstrument;

				if (target && instrumentIndex){
					// check if the instrument is finetuned
					var instrument = me.getInstrument(instrumentIndex);
					if (instrument && instrument.getFineTune()){
                        target = me.inFTMode() ?  instrument.getPeriodForNote(noteIndex,true) : Audio.getFineTuneForPeriod(target,instrument.getFineTune());
					}
				}

				var prevSlide = trackEffectCache[track].slide;

				if (prevSlide){
					if (!value) value = prevSlide.value;
				}
				if (!target) {
					target = trackEffectCache[track].defaultSlideTarget;
				}

				trackEffects.slide = {
					value: value,
					target: target,
					canUseGlissando: true,
					resetVolume: !!note.instrument,
					volume: defaultVolume
				};
				trackEffectCache[track].slide = trackEffects.slide;

				if (note.instrument){
					trackEffects.volume = {
						value: defaultVolume
					};
				}

				break;
			case 4:
				// vibrato
				// reset volume and vibrato timer if instrument number is present
				if (note.instrument) {
					if (trackNotes[track].startVolume) {
						trackEffects.volume = {
							value: volume
						};
					}

					trackNotes[track].vibratoTimer = 0;
				}

				x = value >> 4;
				y = value & 0x0f;

				var freq = (x*ticksPerStep)/64;

                var prevVibrato = trackEffectCache[track].vibrato;
				if (x == 0 && prevVibrato) freq = prevVibrato.freq;
				if (y == 0 && prevVibrato) y = prevVibrato.amplitude;

				trackEffects.vibrato = {
					amplitude: y,
					freq: freq
				};
				trackEffectCache[track].vibrato = trackEffects.vibrato;

				break;
			case 5:
				// continue slide to note
				doPlayNote = false;
				target = notePeriod;

				if (target && instrumentIndex){
					// check if the instrument is finetuned
					instrument = me.getInstrument(instrumentIndex);
					if (instrument && instrument.getFineTune()){
						// TODO - in FT mode - should we use getFineTuneForBote even when linearFrequency is used ?
                        target = me.inFTMode() ?  Audio.getFineTuneForNote(noteIndex,instrument.getFineTune()) : Audio.getFineTuneForPeriod(target,instrument.getFineTune());
					}
				}

				value = 1;

				var prevSlide = trackEffectCache[track].slide;
				if (prevSlide){
					if (!target) target = prevSlide.target  || 0;
					value = prevSlide.value;
				}

				trackEffects.slide = {
					value: value,
					target: target
				};
				trackEffectCache[track].slide = trackEffects.slide;

				if (note.instrument){
					trackEffects.volume = {
						value: defaultVolume
					};
				}

				// and do volume slide
				value = note.param;
				if (!value){
					// don't do volume slide
				}else{
					if (note.param < 16){
						// slide down
						value = value * -1;
					}else{
						// slide up
						//value = note.param & 0x0f;
						value = note.param >> 4;
					}

					// this is based on max volume of 64 -> normalize to 100;
					value = value * 100/64;

					trackEffects.fade = {
						value: value,
						resetOnStep: !!note.instrument // volume only needs resetting when the instrument number is given, other wise the volue is remembered from the preious state
					};
					trackEffectCache[track].fade = trackEffects.fade;
				}

				break;


			case 6:
				// Continue Vibrato and do volume slide

				// reset volume and vibrato timer if instrument number is present
				if (note.instrument) {
					if (trackNotes[track].startVolume) {
						trackEffects.volume = {
							value: volume
						};
					}

					trackNotes[track].vibratoTimer = 0;
				}
				if (note.param){
					if (note.param < 16){
						// volume slide down
						value = value * -1;
					}else{
						// volume slide up
						value = note.param & 0x0f;
					}

					// this is based on max volume of 64 -> normalize to 100;
					value = value * 100/64;

					trackEffects.fade = {
						value: value
					};
					trackEffectCache[track].fade = trackEffects.fade;
				}else{
					// on Fasttracker this command is remembered - on Protracker it is not.
					if (Tracker.inFTMode()){
						if (trackEffectCache[track].fade) trackEffects.fade = trackEffectCache[track].fade;
					}
				}

				if (trackEffectCache[track].vibrato) trackEffects.vibrato = trackEffectCache[track].vibrato;
				break;
			case 7:
				// Tremolo
				// note: having a instrument number without a period doesn't seem te have any effect (protracker)
				// when only a period -> reset the wave form / timer

				if (notePeriod && !note.instrument) {
					if (trackNotes[track].startVolume) {
						trackEffects.volume = {
							value: volume
						};
					}

					trackNotes[track].tremoloTimer = 0;
				}

				x = value >> 4;
				y = value & 0x0f;

				//var amplitude = y * (ticksPerStep-1); Note: this is the formula in the mod spec, but this seems way off;
				var amplitude = y;
				var freq = (x*ticksPerStep)/64;

				var prevTremolo = trackEffectCache[track].tremolo;

				if (x==0 && prevTremolo) freq = prevTremolo.freq;
				if (y==0 && prevTremolo) amplitude = prevTremolo.amplitude;

				trackEffects.tremolo = {
					amplitude:amplitude,
					freq: freq
				};

				trackEffectCache[track].tremolo = trackEffects.tremolo;

				break;
			case 8:
				// Set Panning position
				trackEffects.panning = {
					value:value,
					slide: false
				};
				break;
			case 9:
				// Set instrument offset

				/* quirk in Protracker 1 and 2 ?
				 if NO NOTE is given but a instrument number is present,
				 then the offset is remembered for the next note WITHOUT instrument number
				 but only when the derived instrument number is the same as the offset instrument number
				 see "professional tracker" mod for example

				 also:
				 * if no instrument number is present: don't reset the offset
				  -> the effect cache of the previous 9 command of the instrument is used
				 * if a note is present REAPPLY the offset in the effect cache (but don't set start of instrument)
				  -> the effect cache now contains double the offset

				 */

				value =  value << 8 ;
				if (!value && trackEffectCache[track].offset){
					value = trackEffectCache[track].offset.stepValue || trackEffectCache[track].offset.value || 0;
				}
				var stepValue = value;

				if (SETTINGS.emulateProtracker1OffsetBug && !note.instrument && trackEffectCache[track].offset){
					// bug in PT1 and PT2: add to existing offset if no instrument number is given
					value += trackEffectCache[track].offset.value;
				}

				trackEffects.offset = {
					value: value,
					stepValue: stepValue
				};

				// note: keep previous trackEffectCache[track].offset.instrument intact
				trackEffectCache[track].offset = trackEffectCache[track].offset || {};
				trackEffectCache[track].offset.value = trackEffects.offset.value;
				trackEffectCache[track].offset.stepValue = trackEffects.offset.stepValue;


				if (SETTINGS.emulateProtracker1OffsetBug){

					// quirk in PT1 and PT2: remember instrument offset for instrument
					if (note.instrument) {
						//console.log("set offset cache for instrument " + note.instrument);
						trackEffectCache[track].offset.instrument = note.instrument;
					}

					// bug in PT1 and PT2: re-apply instrument offset in effect cache
					if (notePeriod) {
						//console.log("re-adding offset in effect cache");
						trackEffectCache[track].offset.value += stepValue;
					}

				}

				if (note.instrument){
					trackEffects.volume = {
						value: defaultVolume
					};
				}

				break;
			case 10:
				// volume slide
				if (note.param < 16){
					// slide down
					value = value * -1;
				}else{
					// slide up
					value = note.param >> 4;
				}

				// this is based on max volume of 64 -> normalize to 100;
				value = value * 100/64;

				if (!note.param){
					var prevFade = trackEffectCache[track].fade;
					if (prevFade) value = prevFade.value;
				}

				trackEffects.fade = {
					value: value,
					resetOnStep: !!note.instrument // volume only needs resetting when the instrument number is given, otherwise the volume is remembered from the previous state
				};

				//!!! in FT2 this effect is remembered - in Protracker it is not
				if (me.inFTMode()){
					trackEffectCache[track].fade = trackEffects.fade;
				}

				break;
			case 11:
				// Position Jump

				// quickfix for autoplay ...
				if (!Tracker.autoPlay){
					result.patternBreak = true;
					result.positionBreak = true;
					result.targetSongPosition = note.param;
					result.targetPatternPosition = 0;
				}
				break;
			case 12:
				//volume
				volume = (note.param/64)*100;
				// not this is not relative to the default instrument volume but sets the instrument volume
				trackEffects.volume = {
					value: volume
				};
				break;
			case 13:
				// Pattern Break
				result.patternBreak = true;
				x = value >> 4;
				y = value & 0x0f;
				result.targetPatternPosition = x*10 + y;
				break;
			case 14:
				// Subeffects
				var subEffect = value >> 4;
				var subValue = value & 0x0f;
					switch (subEffect){
						case 0:
							if (!me.inFTMode()) Audio.setAmigaLowPassFilter(!subValue,time);
							break;
						case 1: // Fine slide up
							subValue = subValue*-1;
							if (!subValue && trackEffectCache[track].fineSlide) subValue = trackEffectCache[track].fineSlide.value;
							trackEffects.slide = {
								value: subValue,
								fine: true
							};
							trackEffectCache[track].fineSlide = trackEffects.slide;
							break;
						case 2: // Fine slide down
							if (!subValue && trackEffectCache[track].fineSlide) subValue = trackEffectCache[track].fineSlide.value;
							trackEffects.slide = {
								value: subValue,
								fine: true
							};
							trackEffectCache[track].fineSlide = trackEffects.slide;
							break;
						case 3: // set glissando control
							trackEffectCache[track].glissando = !!subValue;
							break;
						case 4: // Set Vibrato Waveform
							switch(subValue){
								case 1: vibratoFunction = Audio.waveFormFunction.saw; break;
								case 2: vibratoFunction = Audio.waveFormFunction.square; break;
								case 3: vibratoFunction = Audio.waveFormFunction.sine; break; // random
								case 4: vibratoFunction = Audio.waveFormFunction.sine; break; // no retrigger
								case 5: vibratoFunction = Audio.waveFormFunction.saw; break; // no retrigger
								case 6: vibratoFunction = Audio.waveFormFunction.square; break; // no retrigger
								case 7: vibratoFunction = Audio.waveFormFunction.sine; break; // random, no retrigger
								default: vibratoFunction = Audio.waveFormFunction.sine; break;
							}
							break;
						case 5: // Set Fine Tune
							if (instrumentIndex){
								var instrument = me.getInstrument(instrumentIndex);
								trackEffects.fineTune = {
									original: instrument.getFineTune(),
									instrument: instrument
								};
								instrument.setFineTune(subValue);
							}
							break;
						case 6: // Pattern Loop
							if (subValue){
								patternLoopCount[track] = patternLoopCount[track] || 0;
								if (patternLoopCount[track]<subValue){
									patternLoopCount[track]++;
									result.patternBreak = true;
									result.positionBreak = true;
									result.targetSongPosition = songPos.position; // keep on same position
									result.targetPatternPosition = patternLoopStart[track] || 0; // should we default to 0 if no start was set or just ignore?

									console.log("looping to " + result.targetPatternPosition + " for "  + patternLoopCount[track] + "/" + subValue);
								}else{
									patternLoopCount[track] = 0;
								}
							}else{
								console.log("setting loop start to " + songPos.step + " on track " + track);
								patternLoopStart[track] = songPos.step;
							}
							break;
						case 7: // Set Tremolo WaveForm
							switch(subValue){
								case 1: tremoloFunction = Audio.waveFormFunction.saw; break;
								case 2: tremoloFunction = Audio.waveFormFunction.square; break;
								case 3: tremoloFunction = Audio.waveFormFunction.sine; break; // random
								case 4: tremoloFunction = Audio.waveFormFunction.sine; break; // no retrigger
								case 5: tremoloFunction = Audio.waveFormFunction.saw; break; // no retrigger
								case 6: tremoloFunction = Audio.waveFormFunction.square; break; // no retrigger
								case 7: tremoloFunction = Audio.waveFormFunction.sine; break; // random, no retrigger
								default: tremoloFunction = Audio.waveFormFunction.sine; break;
							}
							break;
						case 8: // Set Panning - is this used ?
							console.warn("Set Panning - not implemented");
							break;
						case 9: // Retrigger Note
							if (subValue){
								trackEffects.reTrigger = {
									value: subValue
								}
							}
							break;
						case 10: // Fine volume slide up
							subValue = subValue * 100/64;
							trackEffects.fade = {
								value: subValue,
								fine: true
							};
							break;
						case 11: // Fine volume slide down

							subValue = subValue * 100/64;

							trackEffects.fade = {
								value: -subValue,
								fine: true
							};
							break;
						case 12: // Cut Note
							if (subValue){
								if (subValue<ticksPerStep){
									trackEffects.cutNote = {
										value: subValue
									}
								}
							}else{
								doPlayNote = false;
							}
							break;
						case 13: // Delay Sample start
							if (subValue){
								if (subValue<ticksPerStep){
									time += tickTime * subValue;
								}else{
									doPlayNote = false;
								}
							}
							break;
						case 14: // Pattern Delay
							result.patternDelay = subValue;
							break;
						case 15: // Invert Loop
							// Don't think is used somewhere - ignore
							break;
						default:
							console.warn("Subeffect " + subEffect + " not implemented");
					}
				break;
			case 15:
				//speed
				// Note: shouldn't this be "set speed at time" instead of setting it directly?
				// TODO: -> investigate
				// TODO: Yes ... this is actually quite wrong FIXME !!!!
				
				// Note 2: this hase moved to the beginning of the "row" sequence:
				// we scan all tracks for tempo changes and set them before processing any other command.
				// this is consistant with PT and FT

				//if (note.param < 32){
				//	//if (note.param == 0) note.param = 1;
				//	Tracker.setAmigaSpeed(note.param,time);
				//}else{
				//	Tracker.setBPM(note.param)
				//}
				break;

            case 16:
                //Fasttracker only - global volume
				value = Math.min(value,64);
				if (!me.isPlugin) Audio.setMasterVolume(value/64,time);
                break;
			case 17:
				//Fasttracker only - global volume slide

				x = value >> 4;
				y = value & 0x0f;
				var currentVolume = Audio.getLastMasterVolume()*64;

				var amount = 0;
				if (x){
					var targetTime = time + (x * tickTime);
					amount = x*(ticksPerStep-1);
				}else if (y){
					targetTime = time + (y * tickTime);
					amount = -y*(ticksPerStep-1);
				}

				if (amount){
					value = (currentVolume+amount)/64;
					value = Math.max(0,value);
					value = Math.min(1,value);

					Audio.slideMasterVolume(value,targetTime);
				}

				break;
			case 20:
				//Fasttracker only - Key off
				if (me.inFTMode()){
					offInstrument = instrument || me.getInstrument(trackNotes[track].currentInstrument);
					if (note.param && note.param>=ticksPerStep){
						// ignore: delay is too large
					}else{
						doPlayNote = false;
						if (offInstrument){
							if (note.param){
								trackEffects.noteOff = {
									value: note.param
								}
								doPlayNote = true;
							}else{
								volume = offInstrument.noteOff(time,trackNotes[track]);
								defaultVolume = volume;
							}
						}else{
							console.log("no instrument on track " + track);
							defaultVolume = 0;
						}
					}
				}
				break;
            case 21:
                //Fasttracker only - Set envelope position
                console.warn("Set envelope position not implemented");
                break;
			case 25:
				//Fasttracker only - Panning slide
				console.warn("Panning slide not implemented - track " + track);
				break;
			case 27:
				//Fasttracker only - Multi retrig note
				// still not 100% sure how this is supposed to work ...
				// see https://forum.openmpt.org/index.php?topic=4999.15
				// see lupo.xm for an example (RO1 command)
				trackEffects.reTrigger = {
					value: note.param
				};
				break;
			case 29:
				//Fasttracker only - Tremor
				console.warn("Tremor not implemented");
				break;
			case 33:
				//Fasttracker only - Extra fine porta
				console.warn("Extra fine porta not implemented");
				break;
			default:
				console.warn("unhandled effect: " + note.effect);
		}

		if (doPlayNote && instrumentIndex && notePeriod){
			// cut off previous note on the same track;
			cutNote(track,time);
			trackNotes[track] = {};

			if (instrument){
				trackNotes[track] = instrument.play(noteIndex,notePeriod,volume,track,trackEffects,time);
			}

			//trackNotes[track] = Audio.playSample(instrumentIndex,notePeriod,volume,track,trackEffects,time,noteIndex);
			trackEffectCache[track].defaultSlideTarget = trackNotes[track].startPeriod;
		}


		if (instrumentIndex) {
			trackNotes[track].currentInstrument =  instrumentIndex;

			// reset temporary instrument settings
			if (trackEffects.fineTune && trackEffects.fineTune.instrument){
				trackEffects.fineTune.instrument.setFineTune(trackEffects.fineTune.original || 0);
			}
		}

		if (instrument && instrument.hasVibrato()){
            trackNotes[track].hasAutoVibrato = true;
		}

		trackNotes[track].effects = trackEffects;
		trackNotes[track].note = note;

		return result;
	}