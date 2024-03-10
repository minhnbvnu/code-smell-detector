function quant_compare(quant_comp, best, calc, gi, distort) {
	        /**
	         * noise is given in decibels (dB) relative to masking thesholds.<BR>
	         *
	         * over_noise: ??? (the previous comment is fully wrong)<BR>
	         * tot_noise: ??? (the previous comment is fully wrong)<BR>
	         * max_noise: max quantization noise
	         */
	        var better;

	        switch (quant_comp) {
	            default:
	            case 9:
	            {
	                if (best.over_count > 0) {
	                    /* there are distorted sfb */
	                    better = calc.over_SSD <= best.over_SSD;
	                    if (calc.over_SSD == best.over_SSD)
	                        better = calc.bits < best.bits;
	                } else {
	                    /* no distorted sfb */
	                    better = ((calc.max_noise < 0) && ((calc.max_noise * 10 + calc.bits) <= (best.max_noise * 10 + best.bits)));
	                }
	                break;
	            }

	            case 0:
	                better = calc.over_count < best.over_count
	                    || (calc.over_count == best.over_count && calc.over_noise < best.over_noise)
	                    || (calc.over_count == best.over_count
	                    && BitStream.EQ(calc.over_noise, best.over_noise) && calc.tot_noise < best.tot_noise);
	                break;

	            case 8:
	                calc.max_noise = get_klemm_noise(distort, gi);
	            //$FALL-THROUGH$
	            case 1:
	                better = calc.max_noise < best.max_noise;
	                break;
	            case 2:
	                better = calc.tot_noise < best.tot_noise;
	                break;
	            case 3:
	                better = (calc.tot_noise < best.tot_noise)
	                    && (calc.max_noise < best.max_noise);
	                break;
	            case 4:
	                better = (calc.max_noise <= 0.0 && best.max_noise > 0.2)
	                    || (calc.max_noise <= 0.0 && best.max_noise < 0.0
	                    && best.max_noise > calc.max_noise - 0.2 && calc.tot_noise < best.tot_noise)
	                    || (calc.max_noise <= 0.0 && best.max_noise > 0.0
	                    && best.max_noise > calc.max_noise - 0.2 && calc.tot_noise < best.tot_noise
	                    + best.over_noise)
	                    || (calc.max_noise > 0.0 && best.max_noise > -0.05
	                    && best.max_noise > calc.max_noise - 0.1 && calc.tot_noise
	                    + calc.over_noise < best.tot_noise
	                    + best.over_noise)
	                    || (calc.max_noise > 0.0 && best.max_noise > -0.1
	                    && best.max_noise > calc.max_noise - 0.15 && calc.tot_noise
	                    + calc.over_noise + calc.over_noise < best.tot_noise
	                    + best.over_noise + best.over_noise);
	                break;
	            case 5:
	                better = calc.over_noise < best.over_noise
	                    || (BitStream.EQ(calc.over_noise, best.over_noise) && calc.tot_noise < best.tot_noise);
	                break;
	            case 6:
	                better = calc.over_noise < best.over_noise
	                    || (BitStream.EQ(calc.over_noise, best.over_noise) && (calc.max_noise < best.max_noise || (BitStream
	                        .EQ(calc.max_noise, best.max_noise) && calc.tot_noise <= best.tot_noise)));
	                break;
	            case 7:
	                better = calc.over_count < best.over_count
	                    || calc.over_noise < best.over_noise;
	                break;
	        }

	        if (best.over_count == 0) {
	            /*
	             * If no distorted bands, only use this quantization if it is
	             * better, and if it uses less bits. Unfortunately, part2_3_length
	             * is sometimes a poor estimator of the final size at low bitrates.
	             */
	            better = better && calc.bits < best.bits;
	        }

	        return better;
	    }