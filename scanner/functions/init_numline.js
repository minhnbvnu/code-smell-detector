function init_numline(numlines, bo, bm, bval, bval_width, mld, bo_w, sfreq, blksize, scalepos, deltafreq, sbmax) {
	        var b_frq = new_float(Encoder.CBANDS + 1);
	        var sample_freq_frac = sfreq / (sbmax > 15 ? 2 * 576 : 2 * 192);
	        var partition = new_int(Encoder.HBLKSIZE);
	        var i;
	        sfreq /= blksize;
	        var j = 0;
	        var ni = 0;
	        /* compute numlines, the number of spectral lines in each partition band */
	        /* each partition band should be about DELBARK wide. */
	        for (i = 0; i < Encoder.CBANDS; i++) {
	            var bark1;
	            var j2;
	            bark1 = freq2bark(sfreq * j);

	            b_frq[i] = sfreq * j;

	            for (j2 = j; freq2bark(sfreq * j2) - bark1 < DELBARK
	            && j2 <= blksize / 2; j2++)
	                ;

	            numlines[i] = j2 - j;
	            ni = i + 1;

	            while (j < j2) {
	                partition[j++] = i;
	            }
	            if (j > blksize / 2) {
	                j = blksize / 2;
	                ++i;
	                break;
	            }
	        }
	        b_frq[i] = sfreq * j;

	        for (var sfb = 0; sfb < sbmax; sfb++) {
	            var i1, i2, start, end;
	            var arg;
	            start = scalepos[sfb];
	            end = scalepos[sfb + 1];

	            i1 = 0 | Math.floor(.5 + deltafreq * (start - .5));
	            if (i1 < 0)
	                i1 = 0;
	            i2 = 0 | Math.floor(.5 + deltafreq * (end - .5));

	            if (i2 > blksize / 2)
	                i2 = blksize / 2;

	            bm[sfb] = (partition[i1] + partition[i2]) / 2;
	            bo[sfb] = partition[i2];
	            var f_tmp = sample_freq_frac * end;
	            /*
	             * calculate how much of this band belongs to current scalefactor
	             * band
	             */
	            bo_w[sfb] = (f_tmp - b_frq[bo[sfb]])
	                / (b_frq[bo[sfb] + 1] - b_frq[bo[sfb]]);
	            if (bo_w[sfb] < 0) {
	                bo_w[sfb] = 0;
	            } else {
	                if (bo_w[sfb] > 1) {
	                    bo_w[sfb] = 1;
	                }
	            }
	            /* setup stereo demasking thresholds */
	            /* formula reverse enginerred from plot in paper */
	            arg = freq2bark(sfreq * scalepos[sfb] * deltafreq);
	            arg = ( Math.min(arg, 15.5) / 15.5);

	            mld[sfb] = Math.pow(10.0,
	                1.25 * (1 - Math.cos(Math.PI * arg)) - 2.5);
	        }

	        /* compute bark values of each critical band */
	        j = 0;
	        for (var k = 0; k < ni; k++) {
	            var w = numlines[k];
	            var bark1, bark2;

	            bark1 = freq2bark(sfreq * (j));
	            bark2 = freq2bark(sfreq * (j + w - 1));
	            bval[k] = .5 * (bark1 + bark2);

	            bark1 = freq2bark(sfreq * (j - .5));
	            bark2 = freq2bark(sfreq * (j + w - .5));
	            bval_width[k] = bark2 - bark1;
	            j += w;
	        }

	        return ni;
	    }