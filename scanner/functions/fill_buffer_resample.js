function fill_buffer_resample(gfp, outbuf, outbufPos, desired_len, inbuf, in_bufferPos, len, num_used, ch) {
	        var gfc = gfp.internal_flags;
	        var i, j = 0, k;
	        /* number of convolution functions to pre-compute */
	        var bpc = gfp.out_samplerate
	            / gcd(gfp.out_samplerate, gfp.in_samplerate);
	        if (bpc > LameInternalFlags.BPC)
	            bpc = LameInternalFlags.BPC;

	        var intratio = (Math.abs(gfc.resample_ratio
	            - Math.floor(.5 + gfc.resample_ratio)) < .0001) ? 1 : 0;
	        var fcn = 1.00 / gfc.resample_ratio;
	        if (fcn > 1.00)
	            fcn = 1.00;
	        var filter_l = 31;
	        if (0 == filter_l % 2)
	            --filter_l;
	        /* must be odd */
	        filter_l += intratio;
	        /* unless resample_ratio=int, it must be even */

	        var BLACKSIZE = filter_l + 1;
	        /* size of data needed for FIR */

	        if (gfc.fill_buffer_resample_init == 0) {
	            gfc.inbuf_old[0] = new_float(BLACKSIZE);
	            gfc.inbuf_old[1] = new_float(BLACKSIZE);
	            for (i = 0; i <= 2 * bpc; ++i)
	                gfc.blackfilt[i] = new_float(BLACKSIZE);

	            gfc.itime[0] = 0;
	            gfc.itime[1] = 0;

	            /* precompute blackman filter coefficients */
	            for (j = 0; j <= 2 * bpc; j++) {
	                var sum = 0.;
	                var offset = (j - bpc) / (2. * bpc);
	                for (i = 0; i <= filter_l; i++)
	                    sum += gfc.blackfilt[j][i] = blackman(i - offset, fcn,
	                        filter_l);
	                for (i = 0; i <= filter_l; i++)
	                    gfc.blackfilt[j][i] /= sum;
	            }
	            gfc.fill_buffer_resample_init = 1;
	        }

	        var inbuf_old = gfc.inbuf_old[ch];

	        /* time of j'th element in inbuf = itime + j/ifreq; */
	        /* time of k'th element in outbuf = j/ofreq */
	        for (k = 0; k < desired_len; k++) {
	            var time0;
	            var joff;

	            time0 = k * gfc.resample_ratio;
	            /* time of k'th output sample */
	            j = 0 | Math.floor(time0 - gfc.itime[ch]);

	            /* check if we need more input data */
	            if ((filter_l + j - filter_l / 2) >= len)
	                break;

	            /* blackman filter. by default, window centered at j+.5(filter_l%2) */
	            /* but we want a window centered at time0. */
	            var offset = (time0 - gfc.itime[ch] - (j + .5 * (filter_l % 2)));

	            /* find the closest precomputed window for this offset: */
	            joff = 0 | Math.floor((offset * 2 * bpc) + bpc + .5);
	            var xvalue = 0.;
	            for (i = 0; i <= filter_l; ++i) {
	                var j2 = i + j - filter_l / 2;
	                var y;
	                y = (j2 < 0) ? inbuf_old[BLACKSIZE + j2] : inbuf[in_bufferPos
	                + j2];
	                xvalue += y * gfc.blackfilt[joff][i];
	            }
	            outbuf[outbufPos + k] = xvalue;
	        }

	        /* k = number of samples added to outbuf */
	        /* last k sample used data from [j-filter_l/2,j+filter_l-filter_l/2] */

	        /* how many samples of input data were used: */
	        num_used.num_used = Math.min(len, filter_l + j - filter_l / 2);

	        /*
	         * adjust our input time counter. Incriment by the number of samples
	         * used, then normalize so that next output sample is at time 0, next
	         * input buffer is at time itime[ch]
	         */
	        gfc.itime[ch] += num_used.num_used - k * gfc.resample_ratio;

	        /* save the last BLACKSIZE samples into the inbuf_old buffer */
	        if (num_used.num_used >= BLACKSIZE) {
	            for (i = 0; i < BLACKSIZE; i++)
	                inbuf_old[i] = inbuf[in_bufferPos + num_used.num_used + i
	                - BLACKSIZE];
	        } else {
	            /* shift in num_used.num_used samples into inbuf_old */
	            var n_shift = BLACKSIZE - num_used.num_used;
	            /*
	             * number of samples to
	             * shift
	             */

	            /*
	             * shift n_shift samples by num_used.num_used, to make room for the
	             * num_used new samples
	             */
	            for (i = 0; i < n_shift; ++i)
	                inbuf_old[i] = inbuf_old[i + num_used.num_used];

	            /* shift in the num_used.num_used samples */
	            for (j = 0; i < BLACKSIZE; ++i, ++j)
	                inbuf_old[i] = inbuf[in_bufferPos + j];

	        }
	        return k;
	        /* return the number samples created at the new samplerate */
	    }