function compute_flushbits(gfp, total_bytes_output) {
	        var gfc = gfp.internal_flags;
	        var flushbits, remaining_headers;
	        var bitsPerFrame;
	        var last_ptr, first_ptr;
	        first_ptr = gfc.w_ptr;
	        /* first header to add to bitstream */
	        last_ptr = gfc.h_ptr - 1;
	        /* last header to add to bitstream */
	        if (last_ptr == -1)
	            last_ptr = LameInternalFlags.MAX_HEADER_BUF - 1;

	        /* add this many bits to bitstream so we can flush all headers */
	        flushbits = gfc.header[last_ptr].write_timing - totbit;
	        total_bytes_output.total = flushbits;

	        if (flushbits >= 0) {
	            /* if flushbits >= 0, some headers have not yet been written */
	            /* reduce flushbits by the size of the headers */
	            remaining_headers = 1 + last_ptr - first_ptr;
	            if (last_ptr < first_ptr)
	                remaining_headers = 1 + last_ptr - first_ptr
	                    + LameInternalFlags.MAX_HEADER_BUF;
	            flushbits -= remaining_headers * 8 * gfc.sideinfo_len;
	        }

	        /*
	         * finally, add some bits so that the last frame is complete these bits
	         * are not necessary to decode the last frame, but some decoders will
	         * ignore last frame if these bits are missing
	         */
	        bitsPerFrame = self.getframebits(gfp);
	        flushbits += bitsPerFrame;
	        total_bytes_output.total += bitsPerFrame;
	        /* round up: */
	        if ((total_bytes_output.total % 8) != 0)
	            total_bytes_output.total = 1 + (total_bytes_output.total / 8);
	        else
	            total_bytes_output.total = (total_bytes_output.total / 8);
	        total_bytes_output.total += bufByteIdx + 1;

	        if (flushbits < 0) {
	            System.err.println("strange error flushing buffer ... \n");
	        }
	        return flushbits;
	    }