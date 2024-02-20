function onMIDISuccess(midiAccess) {
				console.log("Midi enabled");
				enabled = true;
				var inputs = midiAccess.inputs;
				var outputs = midiAccess.outputs;
				
				//for (var input of inputs.values()) input.onmidimessage = getMIDIMessage;
				// this barfs on non ES6 browsers -> use Arrays
				
				var _inputs = Array.from(inputs.values());
				_inputs.forEach(function(input){
					input.onmidimessage = getMIDIMessage;
				})
				
				if (_inputs.length){
					EventBus.trigger(EVENT.midiIn);
				}
				
			}