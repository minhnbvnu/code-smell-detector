function vbrpsy_mask_add(m1, m2, b) {
	        var ratio;

	        if (m1 < 0) {
	            m1 = 0;
	        }
	        if (m2 < 0) {
	            m2 = 0;
	        }
	        if (m1 <= 0) {
	            return m2;
	        }
	        if (m2 <= 0) {
	            return m1;
	        }
	        if (m2 > m1) {
	            ratio = m2 / m1;
	        } else {
	            ratio = m1 / m2;
	        }
	        if (-2 <= b && b <= 2) {
	            /* approximately, 1 bark = 3 partitions */
	            /* originally 'if(i > 8)' */
	            if (ratio >= ma_max_i1) {
	                return m1 + m2;
	            } else {
	                var i = 0 | (Util.FAST_LOG10_X(ratio, 16.0));
	                return (m1 + m2) * table2_[i];
	            }
	        }
	        if (ratio < ma_max_i2) {
	            return m1 + m2;
	        }
	        if (m1 < m2) {
	            m1 = m2;
	        }
	        return m1;
	    }