function changeSampleBit(amount){
		var instrument = Tracker.getCurrentInstrument();
		if (instrument) {
			if (amount === 16){
				instrument.sample.bits = 16;
				bit8Button.setActive(false);
				bit16Button.setActive(true);
			}else{
				for (var i = 0, max = instrument.sample.data.length; i<max;i++){
					instrument.sample.data[i] = Math.round(instrument.sample.data[i]*127)/127;
				}
				instrument.sample.bits = 8;
				bit8Button.setActive(true);
				bit16Button.setActive(false);
			}
		}
	}