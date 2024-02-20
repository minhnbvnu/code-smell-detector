function bin_search_StepSize(gfc, cod_info, desired_rate, ch, xrpow) {
	        var nBits;
	        var CurrentStep = gfc.CurrentStep[ch];
	        var flagGoneOver = false;
	        var start = gfc.OldValue[ch];
	        var Direction = BinSearchDirection.BINSEARCH_NONE;
	        cod_info.global_gain = start;
	        desired_rate -= cod_info.part2_length;

	        for (; ;) {
	            var step;
	            nBits = tk.count_bits(gfc, xrpow, cod_info, null);

	            if (CurrentStep == 1 || nBits == desired_rate)
	                break;
	            /* nothing to adjust anymore */

	            if (nBits > desired_rate) {
	                /* increase Quantize_StepSize */
	                if (Direction == BinSearchDirection.BINSEARCH_DOWN)
	                    flagGoneOver = true;

	                if (flagGoneOver)
	                    CurrentStep /= 2;
	                Direction = BinSearchDirection.BINSEARCH_UP;
	                step = CurrentStep;
	            } else {
	                /* decrease Quantize_StepSize */
	                if (Direction == BinSearchDirection.BINSEARCH_UP)
	                    flagGoneOver = true;

	                if (flagGoneOver)
	                    CurrentStep /= 2;
	                Direction = BinSearchDirection.BINSEARCH_DOWN;
	                step = -CurrentStep;
	            }
	            cod_info.global_gain += step;
	            if (cod_info.global_gain < 0) {
	                cod_info.global_gain = 0;
	                flagGoneOver = true;
	            }
	            if (cod_info.global_gain > 255) {
	                cod_info.global_gain = 255;
	                flagGoneOver = true;
	            }
	        }


	        while (nBits > desired_rate && cod_info.global_gain < 255) {
	            cod_info.global_gain++;
	            nBits = tk.count_bits(gfc, xrpow, cod_info, null);
	        }
	        gfc.CurrentStep[ch] = (start - cod_info.global_gain >= 4) ? 4 : 2;
	        gfc.OldValue[ch] = cod_info.global_gain;
	        cod_info.part2_3_length = nBits;
	        return nBits;
	    }