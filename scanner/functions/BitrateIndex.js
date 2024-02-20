function BitrateIndex(bRate, version, samplerate) {
	        /* convert bitrate in kbps to index */
	        if (samplerate < 16000)
	            version = 2;
	        for (var i = 0; i <= 14; i++) {
	            if (Tables.bitrate_table[version][i] > 0) {
	                if (Tables.bitrate_table[version][i] == bRate) {
	                    return i;
	                }
	            }
	        }
	        return -1;
	    }