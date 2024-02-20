function init_s3_values(s3ind, npart, bval, bval_width, norm, use_old_s3) {
	        var s3 = new_float_n([Encoder.CBANDS, Encoder.CBANDS]);
	        /*
	         * The s3 array is not linear in the bark scale.
	         *
	         * bval[x] should be used to get the bark value.
	         */
	        var j;
	        var numberOfNoneZero = 0;

	        /**
	         * <PRE>
	         * s[i][j], the value of the spreading function,
	         * centered at band j (masker), for band i (maskee)
	         *
	         * i.e.: sum over j to spread into signal barkval=i
	         * NOTE: i and j are used opposite as in the ISO docs
	         * </PRE>
	         */
	        if (use_old_s3) {
	            for (var i = 0; i < npart; i++) {
	                for (j = 0; j < npart; j++) {
	                    var v = s3_func(bval[i] - bval[j]) * bval_width[j];
	                    s3[i][j] = v * norm[i];
	                }
	            }
	        } else {
	            for (j = 0; j < npart; j++) {
	                var hf_slope = 15 + Math.min(21 / bval[j], 12);
	                var s3_x_norm = norm_s3_func_x(hf_slope);
	                for (var i = 0; i < npart; i++) {
	                    var v = s3_x_norm
	                        * s3_func_x(bval[i] - bval[j], hf_slope)
	                        * bval_width[j];
	                    s3[i][j] = v * norm[i];
	                }
	            }
	        }
	        for (var i = 0; i < npart; i++) {
	            for (j = 0; j < npart; j++) {
	                if (s3[i][j] > 0.0)
	                    break;
	            }
	            s3ind[i][0] = j;

	            for (j = npart - 1; j > 0; j--) {
	                if (s3[i][j] > 0.0)
	                    break;
	            }
	            s3ind[i][1] = j;
	            numberOfNoneZero += (s3ind[i][1] - s3ind[i][0] + 1);
	        }

	        var p = new_float(numberOfNoneZero);
	        var k = 0;
	        for (var i = 0; i < npart; i++)
	            for (j = s3ind[i][0]; j <= s3ind[i][1]; j++)
	                p[k++] = s3[i][j];

	        return p;
	    }