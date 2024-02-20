function lame_set_VBR_q(gfp, VBR_q) {
	        var ret = 0;

	        if (0 > VBR_q) {
	            /* Unknown VBR quality level! */
	            ret = -1;
	            VBR_q = 0;
	        }
	        if (9 < VBR_q) {
	            ret = -1;
	            VBR_q = 9;
	        }

	        gfp.VBR_q = VBR_q;
	        gfp.VBR_q_frac = 0;
	        return ret;
	    }