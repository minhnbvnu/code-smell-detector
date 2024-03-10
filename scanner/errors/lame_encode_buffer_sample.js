function lame_encode_buffer_sample(gfp, buffer_l, buffer_r, nsamples, mp3buf, mp3bufPos, mp3buf_size) {
	        var gfc = gfp.internal_flags;
	        var mp3size = 0, ret, i, ch, mf_needed;
	        var mp3out;
	        var mfbuf = [null, null];
	        var in_buffer = [null, null];

	        if (gfc.Class_ID != LAME_ID)
	            return -3;

	        if (nsamples == 0)
	            return 0;

	        /* copy out any tags that may have been written into bitstream */
	        mp3out = bs.copy_buffer(gfc, mp3buf, mp3bufPos, mp3buf_size, 0);
	        if (mp3out < 0)
	            return mp3out;
	        /* not enough buffer space */
	        mp3bufPos += mp3out;
	        mp3size += mp3out;

	        in_buffer[0] = buffer_l;
	        in_buffer[1] = buffer_r;

	        /* Apply user defined re-scaling */

	        /* user selected scaling of the samples */
	        if (BitStream.NEQ(gfp.scale, 0) && BitStream.NEQ(gfp.scale, 1.0)) {
	            for (i = 0; i < nsamples; ++i) {
	                in_buffer[0][i] *= gfp.scale;
	                if (gfc.channels_out == 2)
	                    in_buffer[1][i] *= gfp.scale;
	            }
	        }

	        /* user selected scaling of the channel 0 (left) samples */
	        if (BitStream.NEQ(gfp.scale_left, 0)
	            && BitStream.NEQ(gfp.scale_left, 1.0)) {
	            for (i = 0; i < nsamples; ++i) {
	                in_buffer[0][i] *= gfp.scale_left;
	            }
	        }

	        /* user selected scaling of the channel 1 (right) samples */
	        if (BitStream.NEQ(gfp.scale_right, 0)
	            && BitStream.NEQ(gfp.scale_right, 1.0)) {
	            for (i = 0; i < nsamples; ++i) {
	                in_buffer[1][i] *= gfp.scale_right;
	            }
	        }

	        /* Downsample to Mono if 2 channels in and 1 channel out */
	        if (gfp.num_channels == 2 && gfc.channels_out == 1) {
	            for (i = 0; i < nsamples; ++i) {
	                in_buffer[0][i] = 0.5 * ( in_buffer[0][i] + in_buffer[1][i]);
	                in_buffer[1][i] = 0.0;
	            }
	        }

	        mf_needed = calcNeeded(gfp);

	        mfbuf[0] = gfc.mfbuf[0];
	        mfbuf[1] = gfc.mfbuf[1];

	        var in_bufferPos = 0;
	        while (nsamples > 0) {
	            var in_buffer_ptr = [null, null];
	            var n_in = 0;
	            /* number of input samples processed with fill_buffer */
	            var n_out = 0;
	            /* number of samples output with fill_buffer */
	            /* n_in <> n_out if we are resampling */

	            in_buffer_ptr[0] = in_buffer[0];
	            in_buffer_ptr[1] = in_buffer[1];
	            /* copy in new samples into mfbuf, with resampling */
	            var inOut = new InOut();
	            fill_buffer(gfp, mfbuf, in_buffer_ptr, in_bufferPos, nsamples,
	                inOut);
	            n_in = inOut.n_in;
	            n_out = inOut.n_out;

	            /* compute ReplayGain of resampled input if requested */
	            if (gfc.findReplayGain && !gfc.decode_on_the_fly)
	                if (ga.AnalyzeSamples(gfc.rgdata, mfbuf[0], gfc.mf_size,
	                        mfbuf[1], gfc.mf_size, n_out, gfc.channels_out) == GainAnalysis.GAIN_ANALYSIS_ERROR)
	                    return -6;

	            /* update in_buffer counters */
	            nsamples -= n_in;
	            in_bufferPos += n_in;
	            if (gfc.channels_out == 2)
	                ;// in_bufferPos += n_in;

	            /* update mfbuf[] counters */
	            gfc.mf_size += n_out;

	            /*
	             * lame_encode_flush may have set gfc.mf_sample_to_encode to 0 so we
	             * have to reinitialize it here when that happened.
	             */
	            if (gfc.mf_samples_to_encode < 1) {
	                gfc.mf_samples_to_encode = Encoder.ENCDELAY + Encoder.POSTDELAY;
	            }
	            gfc.mf_samples_to_encode += n_out;

	            if (gfc.mf_size >= mf_needed) {
	                /* encode the frame. */
	                /* mp3buf = pointer to current location in buffer */
	                /* mp3buf_size = size of original mp3 output buffer */
	                /* = 0 if we should not worry about the */
	                /* buffer size because calling program is */
	                /* to lazy to compute it */
	                /* mp3size = size of data written to buffer so far */
	                /* mp3buf_size-mp3size = amount of space avalable */

	                var buf_size = mp3buf_size - mp3size;
	                if (mp3buf_size == 0)
	                    buf_size = 0;

	                ret = lame_encode_frame(gfp, mfbuf[0], mfbuf[1], mp3buf,
	                    mp3bufPos, buf_size);

	                if (ret < 0)
	                    return ret;
	                mp3bufPos += ret;
	                mp3size += ret;

	                /* shift out old samples */
	                gfc.mf_size -= gfp.framesize;
	                gfc.mf_samples_to_encode -= gfp.framesize;
	                for (ch = 0; ch < gfc.channels_out; ch++)
	                    for (i = 0; i < gfc.mf_size; i++)
	                        mfbuf[ch][i] = mfbuf[ch][i + gfp.framesize];
	            }
	        }

	        return mp3size;
	    }