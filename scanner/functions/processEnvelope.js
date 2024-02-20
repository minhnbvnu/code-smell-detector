function processEnvelope(envelope){
						envelope.points = [];
						for (si = 0; si < 12; si++) envelope.points.push(envelope.raw.slice(si*2,si*2+2));
						if (envelope.type & 1){ // on
							envelope.enabled = true;
						}

						if (envelope.type & 2){
							// sustain
							envelope.sustain = true;
						}

						if (envelope.type & 4){
							// loop
							envelope.loop = true;
						}

						return envelope;

					}