function mask_add(m1, m2, kk, b, gfc, shortblock) {
	        var ratio;

	        if (m2 > m1) {
	            if (m2 < (m1 * ma_max_i2))
	                ratio = m2 / m1;
	            else
	                return (m1 + m2);
	        } else {
	            if (m1 >= (m2 * ma_max_i2))
	                return (m1 + m2);
	            ratio = m1 / m2;
	        }

	        /* Should always be true, just checking */

	        m1 += m2;
	        //if (((long)(b + 3) & 0xffffffff) <= 3 + 3) {
	        if ((b + 3) <= 3 + 3) {
	            /* approximately, 1 bark = 3 partitions */
	            /* 65% of the cases */
	            /* originally 'if(i > 8)' */
	            if (ratio >= ma_max_i1) {
	                /* 43% of the total */
	                return m1;
	            }

	            /* 22% of the total */
	            var i = 0 | (Util.FAST_LOG10_X(ratio, 16.0));
	            return m1 * table2[i];
	        }

	        /**
	         * <PRE>
	         * m<15 equ log10((m1+m2)/gfc.ATH.cb[k])<1.5
	         * equ (m1+m2)/gfc.ATH.cb[k]<10^1.5
	         * equ (m1+m2)<10^1.5 * gfc.ATH.cb[k]
	         * </PRE>
	         */
	        var i = 0 | Util.FAST_LOG10_X(ratio, 16.0);
	        if (shortblock != 0) {
	            m2 = gfc.ATH.cb_s[kk] * gfc.ATH.adjust;
	        } else {
	            m2 = gfc.ATH.cb_l[kk] * gfc.ATH.adjust;
	        }
	        if (m1 < ma_max_m * m2) {
	            /* 3% of the total */
	            /* Originally if (m > 0) { */
	            if (m1 > m2) {
	                var f, r;

	                f = 1.0;
	                if (i <= 13)
	                    f = table3[i];

	                r = Util.FAST_LOG10_X(m1 / m2, 10.0 / 15.0);
	                return m1 * ((table1[i] - f) * r + f);
	            }

	            if (i > 13)
	                return m1;

	            return m1 * table3[i];
	        }

	        /* 10% of total */
	        return m1 * table1[i];
	    }