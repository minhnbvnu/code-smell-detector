function updateStats(gfc) {
	        var gr, ch;

	        /* count bitrate indices */
	        gfc.bitrate_stereoMode_Hist[gfc.bitrate_index][4]++;
	        gfc.bitrate_stereoMode_Hist[15][4]++;

	        /* count 'em for every mode extension in case of 2 channel encoding */
	        if (gfc.channels_out == 2) {
	            gfc.bitrate_stereoMode_Hist[gfc.bitrate_index][gfc.mode_ext]++;
	            gfc.bitrate_stereoMode_Hist[15][gfc.mode_ext]++;
	        }
	        for (gr = 0; gr < gfc.mode_gr; ++gr) {
	            for (ch = 0; ch < gfc.channels_out; ++ch) {
	                var bt = gfc.l3_side.tt[gr][ch].block_type | 0;
	                if (gfc.l3_side.tt[gr][ch].mixed_block_flag != 0)
	                    bt = 4;
	                gfc.bitrate_blockType_Hist[gfc.bitrate_index][bt]++;
	                gfc.bitrate_blockType_Hist[gfc.bitrate_index][5]++;
	                gfc.bitrate_blockType_Hist[15][bt]++;
	                gfc.bitrate_blockType_Hist[15][5]++;
	            }
	        }
	    }