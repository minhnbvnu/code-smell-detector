function loop_break(cod_info) {
	        for (var sfb = 0; sfb < cod_info.sfbmax; sfb++)
	            if (cod_info.scalefac[sfb]
	                + cod_info.subblock_gain[cod_info.window[sfb]] == 0)
	                return false;

	        return true;
	    }