function vbrpsy_skip_masking_s(gfc, chn, sblock) {
	        if (sblock == 0) {
	            for (var b = 0; b < gfc.npart_s; b++) {
	                gfc.nb_s2[chn][b] = gfc.nb_s1[chn][b];
	                gfc.nb_s1[chn][b] = 0;
	            }
	        }
	    }