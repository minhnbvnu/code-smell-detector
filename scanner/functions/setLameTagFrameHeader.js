function setLameTagFrameHeader(gfp, buffer) {
	        var gfc = gfp.internal_flags;

	        // MP3 Sync Word
	        buffer[0] = shiftInBitsValue(buffer[0], 8, 0xff);

	        buffer[1] = shiftInBitsValue(buffer[1], 3, 7);
	        buffer[1] = shiftInBitsValue(buffer[1], 1,
	            (gfp.out_samplerate < 16000) ? 0 : 1);
	        // Version
	        buffer[1] = shiftInBitsValue(buffer[1], 1, gfp.version);
	        // 01 == Layer 3
	        buffer[1] = shiftInBitsValue(buffer[1], 2, 4 - 3);
	        // Error protection
	        buffer[1] = shiftInBitsValue(buffer[1], 1, (!gfp.error_protection) ? 1
	            : 0);

	        // Bit rate
	        buffer[2] = shiftInBitsValue(buffer[2], 4, gfc.bitrate_index);
	        // Frequency
	        buffer[2] = shiftInBitsValue(buffer[2], 2, gfc.samplerate_index);
	        // Pad. Bit
	        buffer[2] = shiftInBitsValue(buffer[2], 1, 0);
	        // Priv. Bit
	        buffer[2] = shiftInBitsValue(buffer[2], 1, gfp.extension);

	        // Mode
	        buffer[3] = shiftInBitsValue(buffer[3], 2, gfp.mode.ordinal());
	        // Mode extension (Used with Joint Stereo)
	        buffer[3] = shiftInBitsValue(buffer[3], 2, gfc.mode_ext);
	        // Copy
	        buffer[3] = shiftInBitsValue(buffer[3], 1, gfp.copyright);
	        // Original
	        buffer[3] = shiftInBitsValue(buffer[3], 1, gfp.original);
	        // Emphasis
	        buffer[3] = shiftInBitsValue(buffer[3], 2, gfp.emphasis);

	        /* the default VBR header. 48 kbps layer III, no padding, no crc */
	        /* but sampling freq, mode and copyright/copy protection taken */
	        /* from first valid frame */
	        buffer[0] = 0xff;
	        var abyte = 0xff & (buffer[1] & 0xf1);
	        var bitrate;
	        if (1 == gfp.version) {
	            bitrate = XING_BITRATE1;
	        } else {
	            if (gfp.out_samplerate < 16000)
	                bitrate = XING_BITRATE25;
	            else
	                bitrate = XING_BITRATE2;
	        }

	        if (gfp.VBR == VbrMode.vbr_off)
	            bitrate = gfp.brate;

	        var bbyte;
	        if (gfp.free_format)
	            bbyte = 0x00;
	        else
	            bbyte = 0xff & (16 * lame.BitrateIndex(bitrate, gfp.version,
	                    gfp.out_samplerate));

	        /*
	         * Use as much of the info from the real frames in the Xing header:
	         * samplerate, channels, crc, etc...
	         */
	        if (gfp.version == 1) {
	            /* MPEG1 */
	            buffer[1] = 0xff & (abyte | 0x0a);
	            /* was 0x0b; */
	            abyte = 0xff & (buffer[2] & 0x0d);
	            /* AF keep also private bit */
	            buffer[2] = 0xff & (bbyte | abyte);
	            /* 64kbs MPEG1 frame */
	        } else {
	            /* MPEG2 */
	            buffer[1] = 0xff & (abyte | 0x02);
	            /* was 0x03; */
	            abyte = 0xff & (buffer[2] & 0x0d);
	            /* AF keep also private bit */
	            buffer[2] = 0xff & (bbyte | abyte);
	            /* 64kbs MPEG2 frame */
	        }
	    }