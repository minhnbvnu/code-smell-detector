function norm_s3_func_x(hf_slope) {
	        var lim_a = 0, lim_b = 0;
	        {
	            var x = 0, l, h;
	            for (x = 0; s3_func_x(x, hf_slope) > 1e-20; x -= 1)
	                ;
	            l = x;
	            h = 0;
	            while (Math.abs(h - l) > 1e-12) {
	                x = (h + l) / 2;
	                if (s3_func_x(x, hf_slope) > 0) {
	                    h = x;
	                } else {
	                    l = x;
	                }
	            }
	            lim_a = l;
	        }
	        {
	            var x = 0, l, h;
	            for (x = 0; s3_func_x(x, hf_slope) > 1e-20; x += 1)
	                ;
	            l = 0;
	            h = x;
	            while (Math.abs(h - l) > 1e-12) {
	                x = (h + l) / 2;
	                if (s3_func_x(x, hf_slope) > 0) {
	                    l = x;
	                } else {
	                    h = x;
	                }
	            }
	            lim_b = h;
	        }
	        {
	            var sum = 0;
	            var m = 1000;
	            var i;
	            for (i = 0; i <= m; ++i) {
	                var x = lim_a + i * (lim_b - lim_a) / m;
	                var y = s3_func_x(x, hf_slope);
	                sum += y;
	            }
	            {
	                var norm = (m + 1) / (sum * (lim_b - lim_a));
	                /* printf( "norm = %lf\n",norm); */
	                return norm;
	            }
	        }
	    }