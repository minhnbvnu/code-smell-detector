function unicodeFormat8(code) {
	  // 1 byte
	  if (code < 128) {
	    return [code];
	    // 2 bytes
	  } else if (code < 2048) {
	    c0 = 192 + (code >> 6);
	    c1 = 128 + (code & 63);
	    return [c0, c1];
	    // 3 bytes
	  } else {
	    c0 = 224 + (code >> 12);
	    c1 = 128 + (code >> 6 & 63);
	    c2 = 128 + (code & 63);
	    return [c0, c1, c2];
	  }
	}