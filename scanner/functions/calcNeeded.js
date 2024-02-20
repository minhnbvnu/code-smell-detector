function calcNeeded(gfp) {
	        var mf_needed = Encoder.BLKSIZE + gfp.framesize - Encoder.FFTOFFSET;
	        /*
	         * amount needed for FFT
	         */
	        mf_needed = Math.max(mf_needed, 512 + gfp.framesize - 32);

	        return mf_needed;
	    }