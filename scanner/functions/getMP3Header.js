function getMP3Header(buf) {
		/* read samplerate from frame: https://de.wikipedia.org/wiki/MP3#Frame-Header
		https://www.mp3-tech.org/programmer/frame_header.html
		first we need to know ID = MPEG version (2 bits)
		then we another 2bits (sample rate freq index) and we can look in table which samplerate was used
		
		Sampling rate frequency index
		bits	MPEG1     MPEG2	     MPEG2.5
		00    44100 Hz  22050 Hz	 11025 Hz
		01	  48000 Hz	24000 Hz	 12000 Hz
		10	  32000 Hz	16000 Hz	  8000 Hz
		11	  reserv.	  reserv.	   reserv.
		*/
		for (var i = 500; i < buf.length-1; i++) { // before it's not our header
			if (buf[i] === 0xFF && (buf[i+1] & 0xE0) === 0xE0) {
				// header found
				var MP3_translate_ID = ["MPEG Version 2.5", "reserved", "MPEG Version 2", "MPEG Version 1"];
				var MP3_translate_Layer = ["reserved", "Layer III", "Layer II", "Layer I"];
				var MP3_translate_numChannels = /*["Stereo", "Joint Stereo", "2 Mono", "Mono"]*/ [2,2,2,1];
				var MP3_divisor = [4, 0, 2, 1]; // ID=1 -> div=0 !
				var MP3_baseRate = [44100, 48000, 32000]
				var ID = ((buf[i+1] & 0x18)>>3); // 0b00011000
				var Layer = ((buf[i+1] & 6)>>1); // 0b00000110
				var bitrate = ((buf[i+2] & 0xF0)>>4); // 0b11110000
				var srate = ((buf[i+2] & 0xC)>>2); // 0b00001100
				var channels = ((buf[i+3] & 0xC0)>>6); // 0b11000000

				return {
					ID: ID,
					Layer: Layer,
					srate: srate,
					type: 'MP3',
					info: MP3_translate_ID[ID] +" "+ MP3_translate_Layer[Layer],
					sampleRate: (!isNaN(MP3_baseRate[srate] / MP3_divisor[ID])) ? MP3_baseRate[srate] / MP3_divisor[ID] : Audio.context.sampleRate,
					numberOfChannels: MP3_translate_numChannels[channels],
				}
			}
		}
		return false;
	}