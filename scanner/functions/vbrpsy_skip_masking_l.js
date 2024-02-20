function vbrpsy_skip_masking_l(gfc, chn) {
	        for (var b = 0; b < gfc.npart_l; b++) {
	            gfc.nb_2[chn][b] = gfc.nb_1[chn][b];
	            gfc.nb_1[chn][b] = 0;
	        }
	    }