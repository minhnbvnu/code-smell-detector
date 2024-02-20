function psyvbr_calc_mask_index_s(gfc, max, avg, mask_idx) {
	        var last_tab_entry = tab.length - 1;
	        var b = 0;
	        var a = avg[b] + avg[b + 1];
	        if (a > 0.0) {
	            var m = max[b];
	            if (m < max[b + 1])
	                m = max[b + 1];
	            a = 20.0 * (m * 2.0 - a)
	                / (a * (gfc.numlines_s[b] + gfc.numlines_s[b + 1] - 1));
	            var k = 0 | a;
	            if (k > last_tab_entry)
	                k = last_tab_entry;
	            mask_idx[b] = k;
	        } else {
	            mask_idx[b] = 0;
	        }

	        for (b = 1; b < gfc.npart_s - 1; b++) {
	            a = avg[b - 1] + avg[b] + avg[b + 1];
	            if (a > 0.0) {
	                var m = max[b - 1];
	                if (m < max[b])
	                    m = max[b];
	                if (m < max[b + 1])
	                    m = max[b + 1];
	                a = 20.0
	                    * (m * 3.0 - a)
	                    / (a * (gfc.numlines_s[b - 1] + gfc.numlines_s[b]
	                    + gfc.numlines_s[b + 1] - 1));
	                var k = 0 | a;
	                if (k > last_tab_entry)
	                    k = last_tab_entry;
	                mask_idx[b] = k;
	            } else {
	                mask_idx[b] = 0;
	            }
	        }

	        a = avg[b - 1] + avg[b];
	        if (a > 0.0) {
	            var m = max[b - 1];
	            if (m < max[b])
	                m = max[b];
	            a = 20.0 * (m * 2.0 - a)
	                / (a * (gfc.numlines_s[b - 1] + gfc.numlines_s[b] - 1));
	            var k = 0 | a;
	            if (k > last_tab_entry)
	                k = last_tab_entry;
	            mask_idx[b] = k;
	        } else {
	            mask_idx[b] = 0;
	        }
	    }