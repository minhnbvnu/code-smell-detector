function setVibratoWave(index){

		waveButtons.forEach(function(button,i){
            button.setActive(index === i);
		});

        var instrument = Tracker.getCurrentInstrument();
            if (instrument){
                instrument.vibrato.type = index;
			}

	}