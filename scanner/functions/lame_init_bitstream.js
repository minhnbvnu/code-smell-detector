function lame_init_bitstream(gfp) {
	        var gfc = gfp.internal_flags;
	        gfp.frameNum = 0;

	        if (gfp.write_id3tag_automatic) {
	            id3.id3tag_write_v2(gfp);
	        }
	        /* initialize histogram data optionally used by frontend */

	        gfc.bitrate_stereoMode_Hist = new_int_n([16, 4 + 1]);
	        gfc.bitrate_blockType_Hist = new_int_n([16, 4 + 1 + 1]);

	        gfc.PeakSample = 0.0;

	        /* Write initial VBR Header to bitstream and init VBR data */
	        if (gfp.bWriteVbrTag)
	            vbr.InitVbrTag(gfp);
	    }