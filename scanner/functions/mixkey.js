function mixkey(seed, key) {
	      var stringseed = seed + '',
	          smear,
	          j = 0;

	      while (j < stringseed.length) {
	        key[mask & j] = mask & (smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++);
	      }

	      return tostring(key);
	    }