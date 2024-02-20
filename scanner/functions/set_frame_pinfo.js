function set_frame_pinfo(gfp, ratio) {
	        var gfc = gfp.internal_flags;

	        gfc.masking_lower = 1.0;

	        /*
	         * for every granule and channel patch l3_enc and set info
	         */
	        for (var gr = 0; gr < gfc.mode_gr; gr++) {
	            for (var ch = 0; ch < gfc.channels_out; ch++) {
	                var cod_info = gfc.l3_side.tt[gr][ch];
	                var scalefac_sav = new_int(L3Side.SFBMAX);
	                System.arraycopy(cod_info.scalefac, 0, scalefac_sav, 0,
	                    scalefac_sav.length);

	                /*
	                 * reconstruct the scalefactors in case SCFSI was used
	                 */
	                if (gr == 1) {
	                    var sfb;
	                    for (sfb = 0; sfb < cod_info.sfb_lmax; sfb++) {
	                        if (cod_info.scalefac[sfb] < 0) /* scfsi */
	                            cod_info.scalefac[sfb] = gfc.l3_side.tt[0][ch].scalefac[sfb];
	                    }
	                }

	                set_pinfo(gfp, cod_info, ratio[gr][ch], gr, ch);
	                System.arraycopy(scalefac_sav, 0, cod_info.scalefac, 0,
	                    scalefac_sav.length);
	            }
	            /* for ch */
	        }
	        /* for gr */
	    }