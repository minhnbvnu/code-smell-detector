function vbrpsy_compute_block_type(gfp, uselongblock) {
	        var gfc = gfp.internal_flags;

	        if (gfp.short_blocks == ShortBlock.short_block_coupled
	                /* force both channels to use the same block type */
	                /* this is necessary if the frame is to be encoded in ms_stereo. */
	                /* But even without ms_stereo, FhG does this */
	            && !(uselongblock[0] != 0 && uselongblock[1] != 0))
	            uselongblock[0] = uselongblock[1] = 0;

	        for (var chn = 0; chn < gfc.channels_out; chn++) {
	            /* disable short blocks */
	            if (gfp.short_blocks == ShortBlock.short_block_dispensed) {
	                uselongblock[chn] = 1;
	            }
	            if (gfp.short_blocks == ShortBlock.short_block_forced) {
	                uselongblock[chn] = 0;
	            }
	        }
	    }