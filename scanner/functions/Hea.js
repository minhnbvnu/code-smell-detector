function Hea(e){if(Gea){var t=e.data;switch(t[0]){case 128:case 129:Jea(t[1]);break;case 144:case 145:case 146:case 147:case 148:case 149:case 150:case 151:case 152:case 153:case 154:case 155:case 156:case 157:case 158:case 159:(t[2]?function(e,t){var n,a=e-47,r=Input.getCurrentOctave();"enabled"===SETTINGS.midi&&(n=t+1>>1);Input.handleNoteOn(a+12*r,void 0,void 0,n)}:Jea)(t[1],t[2]);break;case 176:break;case 192:Tracker.setCurrentInstrumentIndex(t[1]+1)}EventBus.trigger(EVENT.midiIn)}}