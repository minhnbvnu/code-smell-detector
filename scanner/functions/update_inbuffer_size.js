function update_inbuffer_size(gfc, nsamples) {
	        if (gfc.in_buffer_0 == null || gfc.in_buffer_nsamples < nsamples) {
	            gfc.in_buffer_0 = new_float(nsamples);
	            gfc.in_buffer_1 = new_float(nsamples);
	            gfc.in_buffer_nsamples = nsamples;
	        }
	    }