function fill_buffer(gfp, mfbuf, in_buffer, in_bufferPos, nsamples, io) {
	        var gfc = gfp.internal_flags;

	        /* copy in new samples into mfbuf, with resampling if necessary */
	        if ((gfc.resample_ratio < .9999) || (gfc.resample_ratio > 1.0001)) {
	            for (var ch = 0; ch < gfc.channels_out; ch++) {
	                var numUsed = new NumUsed();
	                io.n_out = fill_buffer_resample(gfp, mfbuf[ch], gfc.mf_size,
	                    gfp.framesize, in_buffer[ch], in_bufferPos, nsamples,
	                    numUsed, ch);
	                io.n_in = numUsed.num_used;
	            }
	        } else {
	            io.n_out = Math.min(gfp.framesize, nsamples);
	            io.n_in = io.n_out;
	            for (var i = 0; i < io.n_out; ++i) {
	                mfbuf[0][gfc.mf_size + i] = in_buffer[0][in_bufferPos + i];
	                if (gfc.channels_out == 2)
	                    mfbuf[1][gfc.mf_size + i] = in_buffer[1][in_bufferPos + i];
	            }
	        }
	    }