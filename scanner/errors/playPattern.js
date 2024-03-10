		mainTimer = clock.setTimeout(function(event) {

			if (p>1){
				delay = playingDelay;
				mainTimer.repeat(delay);
			}

			var maxTime = event.deadline + delay;
			Audio.clearScheduledNotesCache();


			while (time<maxTime){

				// ignore speed==0 when autoplay is active (Playlists)
                if(stepResult.pause && !Tracker.autoPlay){
                    // speed is set to 0
					if (!stepResult.pasuseHandled){
                        var delta = time - Audio.context.currentTime;
                        if (delta>0){
                        	setTimeout(function(){
                        		me.pause();
                        		// in Fasttracker this repeats the current step with the previous speed - including effects.
								// (which seems totally weird)
								me.setAmigaSpeed(6);
							},Math.round(delta*1000)+100);
						}
                        stepResult.pasuseHandled=true;
					}
					return;
                }
                
                me.setStateAtTime(time,{patternPos: p, songPos: playSongPosition});
                if (!UI) me.setCurrentSongPosition(playSongPosition);

				if (stepResult.patternDelay){
					// the E14 effect is used: delay Pattern but keep processing effects
					stepResult.patternDelay--;

					for (i = 0; i<trackCount; i++){
						applyEffects(i,time);
					}

					time += ticksPerStep * tickTime;
                }else{
					stepResult = playPatternStep(p,time,playPatternData,playSongPosition);
					time += ticksPerStep * tickTime;
					p++;
					if (p>=thisPatternLength || stepResult.patternBreak){
						if (!(stepResult.positionBreak && stepResult.targetSongPosition == playSongPosition)){
							//We're not in a pattern loop
							patternLoopStart = [];
							patternLoopCount = [];
						}
						p=0;
						if (Tracker.getPlayType() == PLAYTYPE.song){
							var nextPosition = stepResult.positionBreak ? stepResult.targetSongPosition : ++playSongPosition;
							if (nextPosition>=song.length) {
								nextPosition = song.restartPosition ? song.restartPosition-1 : 0;
								EventBus.trigger(EVENT.songEnd);
							}
							if (nextPosition>=song.length) nextPosition = 0;
							playSongPosition = nextPosition;
							patternIndex = song.patternTable[playSongPosition];
							playPatternData = song.patterns[patternIndex];

							// some invalid(?) XM files have non-existent patterns in their song list - eg. cybernautic_squierl.xm
							if (!playPatternData) {
								playPatternData =  getEmptyPattern();
								song.patterns[patternIndex] = playPatternData;
							}

                            thisPatternLength = playPatternData.length;
							if (stepResult.patternBreak){
								p = stepResult.targetPatternPosition || 0;
								if (p>playPatternData.length) p=0; // occurs in the wild - example "Lake Of Sadness" - last pattern
                            }
						}else{
							if (stepResult.patternBreak) {
								p = stepResult.targetPatternPosition || 0;
								if (p>patternLength) p=0;
							}
						}
						EventBus.trigger(EVENT.patternEnd,time - ticksPerStep * tickTime);
					}
				}

			}

			// check if a playing note has looping parameters that needs further scheduling

            for (i = 0; i<trackCount; i++){
                var trackNote = trackNotes[i];
                if (trackNote && trackNote.time && trackNote.scheduled){

					var instrument = me.getInstrument(trackNote.instrumentIndex);
					if(instrument){

					}

                	if (trackNote.scheduled.volume){
                		if ((time + delay) >= trackNote.scheduled.volume){
							var scheduledtime = instrument.scheduleEnvelopeLoop(trackNote.volumeEnvelope,trackNote.scheduled.volume,2);
							trackNote.scheduled.volume += scheduledtime;
                        }
					}

					if (trackNote.scheduled.panning){
						if ((time + delay) >= trackNote.scheduled.panning){
							scheduledtime = instrument.scheduleEnvelopeLoop(trackNote.panningEnvelope,trackNote.scheduled.panning,2);
							trackNote.scheduled.panning += scheduledtime;
						}
					}
				}
            }


		},0.01).repeat(delay).tolerance({early: 0.1});