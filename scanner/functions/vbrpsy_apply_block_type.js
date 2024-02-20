function vbrpsy_apply_block_type(gfp, uselongblock, blocktype_d) {
	        var gfc = gfp.internal_flags;

	        /*
	         * update the blocktype of the previous granule, since it depends on
	         * what happend in this granule
	         */
	        for (var chn = 0; chn < gfc.channels_out; chn++) {
	            var blocktype = Encoder.NORM_TYPE;
	            /* disable short blocks */

	            if (uselongblock[chn] != 0) {
	                /* no attack : use long blocks */
	                if (gfc.blocktype_old[chn] == Encoder.SHORT_TYPE)
	                    blocktype = Encoder.STOP_TYPE;
	            } else {
	                /* attack : use short blocks */
	                blocktype = Encoder.SHORT_TYPE;
	                if (gfc.blocktype_old[chn] == Encoder.NORM_TYPE) {
	                    gfc.blocktype_old[chn] = Encoder.START_TYPE;
	                }
	                if (gfc.blocktype_old[chn] == Encoder.STOP_TYPE)
	                    gfc.blocktype_old[chn] = Encoder.SHORT_TYPE;
	            }

	            blocktype_d[chn] = gfc.blocktype_old[chn];
	            // value returned to calling program
	            gfc.blocktype_old[chn] = blocktype;
	            // save for next call to l3psy_anal
	        }
	    }