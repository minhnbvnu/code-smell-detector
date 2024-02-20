function playPatternStep(step,time,patternData,songPostition){

		patternData = patternData || currentPatternData;
		// note: patternData can be different than currentPatternData when playback is active with long look ahead times

		var patternStep = patternData[step];
		var tracks = trackCount;
		var result = {};
		var r;

		// hmmm ... Whut?
		// The Speed setting influences other effects too,
		// on Amiga players the effects are processed each tick, so the speed setting on a later channel can influence the effects on a previous channel ...
		// This is implemented by setting the speed before all other effects
		// example: see the ED2 command pattern 0, track 3, step 32 in AceMan - Dirty Tricks.mod
		// not sure this is 100% correct, but in any case it's more correct then setting it at the track it self.
		// Thinking ... ... yes ... should be fine as no speed related effects are processed on tick 0?
		//
		

		for (var i = 0; i<tracks; i++){
			note = patternStep[i];
			if (note && note.effect && note.effect === 15){
				if (note.param < 32){
					//if (note.param == 0) note.param = 1;
					Tracker.setAmigaSpeed(note.param);
					if (note.param === 0) result.pause = true;
				}else{
					Tracker.setBPM(note.param)
				}
			}
		}
		// --- end Whut? ---



		for (var i = 0; i<tracks; i++){
			var note = patternStep[i];
			if (note){
                var songPos = {position: songPostition, step: step};

                var playtime = time;
                if (swing){
                    var swingTime = ((Math.random() * swing * 2) - swing) / 1000;
                    playtime += swingTime;
                }


                r = playNote(note,i,playtime,songPos);
                if (r.patternBreak) {
                    result.patternBreak = true;
                    result.targetPatternPosition = r.targetPatternPosition || 0;
                }
                if (r.positionBreak) {
                    result.positionBreak = true;
                    result.targetPatternPosition = r.targetPatternPosition || 0;
                    result.targetSongPosition = r.targetSongPosition || 0;
                }
                if (r.patternDelay) result.patternDelay = r.patternDelay;
			}
		}

		for (i = 0; i<tracks; i++){
			applyEffects(i,time)
		}


		return result;
	}