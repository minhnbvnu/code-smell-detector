function block_type_set(gfp, uselongblock, blocktype_d, blocktype) {
	        var gfc = gfp.internal_flags;

	        if (gfp.short_blocks == ShortBlock.short_block_coupled
	                /* force both channels to use the same block type */
	                /* this is necessary if the frame is to be encoded in ms_stereo. */
	                /* But even without ms_stereo, FhG does this */
	            && !(uselongblock[0] != 0 && uselongblock[1] != 0))
	            uselongblock[0] = uselongblock[1] = 0;

	        /*
	         * update the blocktype of the previous granule, since it depends on
	         * what happend in this granule
	         */
	        for (var chn = 0; chn < gfc.channels_out; chn++) {
	            blocktype[chn] = Encoder.NORM_TYPE;
	            /* disable short blocks */
	            if (gfp.short_blocks == ShortBlock.short_block_dispensed)
	                uselongblock[chn] = 1;
	            if (gfp.short_blocks == ShortBlock.short_block_forced)
	                uselongblock[chn] = 0;

	            if (uselongblock[chn] != 0) {
	                /* no attack : use long blocks */
	                if (gfc.blocktype_old[chn] == Encoder.SHORT_TYPE)
	                    blocktype[chn] = Encoder.STOP_TYPE;
	            } else {
	                /* attack : use short blocks */
	                blocktype[chn] = Encoder.SHORT_TYPE;
	                if (gfc.blocktype_old[chn] == Encoder.NORM_TYPE) {
	                    gfc.blocktype_old[chn] = Encoder.START_TYPE;
	                }
	                if (gfc.blocktype_old[chn] == Encoder.STOP_TYPE)
	                    gfc.blocktype_old[chn] = Encoder.SHORT_TYPE;
	            }

	            blocktype_d[chn] = gfc.blocktype_old[chn];
	            // value returned to calling program
	            gfc.blocktype_old[chn] = blocktype[chn];
	            // save for next call to l3psy_anal
	        }
	    }