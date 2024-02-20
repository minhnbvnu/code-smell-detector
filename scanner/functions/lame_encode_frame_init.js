function lame_encode_frame_init(gfp, inbuf) {
	        var gfc = gfp.internal_flags;

	        var ch, gr;

	        if (gfc.lame_encode_frame_init == 0) {
	            /* prime the MDCT/polyphase filterbank with a short block */
	            var i, j;
	            var primebuff0 = new_float(286 + 1152 + 576);
	            var primebuff1 = new_float(286 + 1152 + 576);
	            gfc.lame_encode_frame_init = 1;
	            for (i = 0, j = 0; i < 286 + 576 * (1 + gfc.mode_gr); ++i) {
	                if (i < 576 * gfc.mode_gr) {
	                    primebuff0[i] = 0;
	                    if (gfc.channels_out == 2)
	                        primebuff1[i] = 0;
	                } else {
	                    primebuff0[i] = inbuf[0][j];
	                    if (gfc.channels_out == 2)
	                        primebuff1[i] = inbuf[1][j];
	                    ++j;
	                }
	            }
	            /* polyphase filtering / mdct */
	            for (gr = 0; gr < gfc.mode_gr; gr++) {
	                for (ch = 0; ch < gfc.channels_out; ch++) {
	                    gfc.l3_side.tt[gr][ch].block_type = Encoder.SHORT_TYPE;
	                }
	            }
	            newMDCT.mdct_sub48(gfc, primebuff0, primebuff1);

	            /* check FFT will not use a negative starting offset */
	            /* check if we have enough data for FFT */
	            /* check if we have enough data for polyphase filterbank */
	        }

	    }