function getMIDIMessage(midiMessage) {
		if (!enabled) return;
		var data = midiMessage.data;
		switch (data[0]){
			case 128:
			case 129:
				noteOff(data[1],data[2]);
				break;
			case 144:
			case 145:
			case 146:
			case 147:
			case 148:
			case 149:
			case 150:
			case 151:
			case 152:
			case 153:
			case 154:
			case 155:
			case 156:
			case 157:
			case 158:
			case 159:
				// TODO: make a difference per midi channel?
				if (data[2]){
					noteOn(data[1],data[2]);
				}else{
					noteOff(data[1],data[2]);
				}
				break;
			case 176:
				console.log("Midi: set effect",data[1],data[2]);
				break;
			case 192:
				// select voice
				var index = data[1];
				Tracker.setCurrentInstrumentIndex(index+1);
				break;
			case 224:
				console.log("Modulator",data[1],data[2]);
				break;
			default:
				//console.log("Midi In:",data);
		}
		
		EventBus.trigger(EVENT.midiIn);
	}