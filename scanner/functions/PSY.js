function PSY() {
	        /**
	         * The dbQ stuff.
	         */
	        this.mask_adjust = 0.;
	        /**
	         * The dbQ stuff.
	         */
	        this.mask_adjust_short = 0.;
	        /* at transition from one scalefactor band to next */
	        /**
	         * Band weight long scalefactor bands.
	         */
	        this.bo_l_weight = new_float(Encoder.SBMAX_l);
	        /**
	         * Band weight short scalefactor bands.
	         */
	        this.bo_s_weight = new_float(Encoder.SBMAX_s);
	    }