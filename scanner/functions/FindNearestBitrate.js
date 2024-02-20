function FindNearestBitrate(bRate, version, samplerate) {
	        /* MPEG-1 or MPEG-2 LSF */
	        if (samplerate < 16000)
	            version = 2;

	        var bitrate = Tables.bitrate_table[version][1];

	        for (var i = 2; i <= 14; i++) {
	            if (Tables.bitrate_table[version][i] > 0) {
	                if (Math.abs(Tables.bitrate_table[version][i] - bRate) < Math
	                        .abs(bitrate - bRate))
	                    bitrate = Tables.bitrate_table[version][i];
	            }
	        }
	        return bitrate;
	    }