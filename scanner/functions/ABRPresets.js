function ABRPresets(kbps, comp, compS,
	                        joint, fix, shThreshold,
	                        shThresholdS, bass, sc,
	                        mask, lower, curve,
	                        interCh, sfScale) {
	        this.quant_comp = comp;
	        this.quant_comp_s = compS;
	        this.safejoint = joint;
	        this.nsmsfix = fix;
	        this.st_lrm = shThreshold;
	        this.st_s = shThresholdS;
	        this.nsbass = bass;
	        this.scale = sc;
	        this.masking_adj = mask;
	        this.ath_lower = lower;
	        this.ath_curve = curve;
	        this.interch = interCh;
	        this.sfscale = sfScale;
	    }