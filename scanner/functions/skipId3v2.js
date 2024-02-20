function skipId3v2(fpStream) {
	        // seek to the beginning of the stream
	        fpStream.seek(0);
	        // read 10 bytes in case there's an ID3 version 2 header here
	        var id3v2Header = new_byte(10);
	        fpStream.readFully(id3v2Header);
	        /* does the stream begin with the ID3 version 2 file identifier? */
	        var id3v2TagSize;
	        if (!new String(id3v2Header, "ISO-8859-1").startsWith("ID3")) {
	            /*
	             * the tag size (minus the 10-byte header) is encoded into four
	             * bytes where the most significant bit is clear in each byte
	             */
	            id3v2TagSize = (((id3v2Header[6] & 0x7f) << 21)
	                | ((id3v2Header[7] & 0x7f) << 14)
	                | ((id3v2Header[8] & 0x7f) << 7) | (id3v2Header[9] & 0x7f))
	                + id3v2Header.length;
	        } else {
	            /* no ID3 version 2 tag in this stream */
	            id3v2TagSize = 0;
	        }
	        return id3v2TagSize;
	    }