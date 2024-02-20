function scfsi_calc(ch, l3_side) {
	        var sfb;
	        var gi = l3_side.tt[1][ch];
	        var g0 = l3_side.tt[0][ch];

	        for (var i = 0; i < Tables.scfsi_band.length - 1; i++) {
	            for (sfb = Tables.scfsi_band[i]; sfb < Tables.scfsi_band[i + 1]; sfb++) {
	                if (g0.scalefac[sfb] != gi.scalefac[sfb]
	                    && gi.scalefac[sfb] >= 0)
	                    break;
	            }
	            if (sfb == Tables.scfsi_band[i + 1]) {
	                for (sfb = Tables.scfsi_band[i]; sfb < Tables.scfsi_band[i + 1]; sfb++) {
	                    gi.scalefac[sfb] = -1;
	                }
	                l3_side.scfsi[ch][i] = 1;
	            }
	        }
	        var s1 = 0;
	        var c1 = 0;
	        for (sfb = 0; sfb < 11; sfb++) {
	            if (gi.scalefac[sfb] == -1)
	                continue;
	            c1++;
	            if (s1 < gi.scalefac[sfb])
	                s1 = gi.scalefac[sfb];
	        }
	        var s2 = 0;
	        var c2 = 0;
	        for (; sfb < Encoder.SBPSY_l; sfb++) {
	            if (gi.scalefac[sfb] == -1)
	                continue;
	            c2++;
	            if (s2 < gi.scalefac[sfb])
	                s2 = gi.scalefac[sfb];
	        }

	        for (var i = 0; i < 16; i++) {
	            if (s1 < slen1_n[i] && s2 < slen2_n[i]) {
	                var c = slen1_tab[i] * c1 + slen2_tab[i] * c2;
	                if (gi.part2_length > c) {
	                    gi.part2_length = c;
	                    gi.scalefac_compress = i;
	                }
	            }
	        }
	    }