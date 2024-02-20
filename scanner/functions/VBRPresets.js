function VBRPresets(qual, comp, compS,
	                        y, shThreshold, shThresholdS,
	                        adj, adjShort, lower,
	                        curve, sens, inter,
	                        joint, mod, fix) {
	        this.vbr_q = qual;
	        this.quant_comp = comp;
	        this.quant_comp_s = compS;
	        this.expY = y;
	        this.st_lrm = shThreshold;
	        this.st_s = shThresholdS;
	        this.masking_adj = adj;
	        this.masking_adj_short = adjShort;
	        this.ath_lower = lower;
	        this.ath_curve = curve;
	        this.ath_sensitivity = sens;
	        this.interch = inter;
	        this.safejoint = joint;
	        this.sfb21mod = mod;
	        this.msfix = fix;
	    }