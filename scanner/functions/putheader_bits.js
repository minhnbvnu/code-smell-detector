function putheader_bits(gfc) {
	        System.arraycopy(gfc.header[gfc.w_ptr].buf, 0, buf, bufByteIdx, gfc.sideinfo_len);
	        bufByteIdx += gfc.sideinfo_len;
	        totbit += gfc.sideinfo_len * 8;
	        gfc.w_ptr = (gfc.w_ptr + 1) & (LameInternalFlags.MAX_HEADER_BUF - 1);
	    }