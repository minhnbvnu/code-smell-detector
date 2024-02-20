function drain_into_ancillary(gfp, remainingBits) {
	        var gfc = gfp.internal_flags;
	        var i;

	        if (remainingBits >= 8) {
	            putbits2(gfc, 0x4c, 8);
	            remainingBits -= 8;
	        }
	        if (remainingBits >= 8) {
	            putbits2(gfc, 0x41, 8);
	            remainingBits -= 8;
	        }
	        if (remainingBits >= 8) {
	            putbits2(gfc, 0x4d, 8);
	            remainingBits -= 8;
	        }
	        if (remainingBits >= 8) {
	            putbits2(gfc, 0x45, 8);
	            remainingBits -= 8;
	        }

	        if (remainingBits >= 32) {
	            var version = ver.getLameShortVersion();
	            if (remainingBits >= 32)
	                for (i = 0; i < version.length && remainingBits >= 8; ++i) {
	                    remainingBits -= 8;
	                    putbits2(gfc, version.charAt(i), 8);
	                }
	        }

	        for (; remainingBits >= 1; remainingBits -= 1) {
	            putbits2(gfc, gfc.ancillary_flag, 1);
	            gfc.ancillary_flag ^= (!gfp.disable_reservoir ? 1 : 0);
	        }


	    }