function init(me, seed) {
	        var t,
	            v,
	            i,
	            j,
	            w,
	            X = [],
	            limit = 128;

	        if (seed === (seed | 0)) {
	          // Numeric seeds initialize v, which is used to generates X.
	          v = seed;
	          seed = null;
	        } else {
	          // String seeds are mixed into v and X one character at a time.
	          seed = seed + '\0';
	          v = 0;
	          limit = Math.max(limit, seed.length);
	        } // Initialize circular array and weyl value.


	        for (i = 0, j = -32; j < limit; ++j) {
	          // Put the unicode characters into the array, and shuffle them.
	          if (seed) v ^= seed.charCodeAt((j + 32) % seed.length); // After 32 shuffles, take v as the starting w value.

	          if (j === 0) w = v;
	          v ^= v << 10;
	          v ^= v >>> 15;
	          v ^= v << 4;
	          v ^= v >>> 13;

	          if (j >= 0) {
	            w = w + 0x61c88647 | 0; // Weyl.

	            t = X[j & 127] ^= v + w; // Combine xor and weyl to init array.

	            i = 0 == t ? i + 1 : 0; // Count zeroes.
	          }
	        } // We have detected all zeroes; make the key nonzero.


	        if (i >= 128) {
	          X[(seed && seed.length || 0) & 127] = -1;
	        } // Run the generator 512 times to further mix the state before using it.
	        // Factoring this as a function slows the main generator, so it is just
	        // unrolled here.  The weyl generator is not advanced while warming up.


	        i = 127;

	        for (j = 4 * 128; j > 0; --j) {
	          v = X[i + 34 & 127];
	          t = X[i = i + 1 & 127];
	          v ^= v << 13;
	          t ^= t << 17;
	          v ^= v >>> 15;
	          t ^= t >>> 12;
	          X[i] = v ^ t;
	        } // Storing state as object members is faster than using closure variables.


	        me.w = w;
	        me.X = X;
	        me.i = i;
	      }