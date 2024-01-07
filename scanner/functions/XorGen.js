function XorGen(seed) {
	      var me = this,
	          strseed = ''; // Set up generator function.

	      me.next = function () {
	        var b = me.b,
	            c = me.c,
	            d = me.d,
	            a = me.a;
	        b = b << 25 ^ b >>> 7 ^ c;
	        c = c - d | 0;
	        d = d << 24 ^ d >>> 8 ^ a;
	        a = a - b | 0;
	        me.b = b = b << 20 ^ b >>> 12 ^ c;
	        me.c = c = c - d | 0;
	        me.d = d << 16 ^ c >>> 16 ^ a;
	        return me.a = a - b | 0;
	      };
	      /* The following is non-inverted tyche, which has better internal
	       * bit diffusion, but which is about 25% slower than tyche-i in JS.
	      me.next = function() {
	        var a = me.a, b = me.b, c = me.c, d = me.d;
	        a = (me.a + me.b | 0) >>> 0;
	        d = me.d ^ a; d = d << 16 ^ d >>> 16;
	        c = me.c + d | 0;
	        b = me.b ^ c; b = b << 12 ^ d >>> 20;
	        me.a = a = a + b | 0;
	        d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
	        me.c = c = c + d | 0;
	        b = b ^ c;
	        return me.b = (b << 7 ^ b >>> 25);
	      }
	      */


	      me.a = 0;
	      me.b = 0;
	      me.c = 2654435769 | 0;
	      me.d = 1367130551;

	      if (seed === Math.floor(seed)) {
	        // Integer seed.
	        me.a = seed / 0x100000000 | 0;
	        me.b = seed | 0;
	      } else {
	        // String seed.
	        strseed += seed;
	      } // Mix in string seed, then discard an initial batch of 64 values.


	      for (var k = 0; k < strseed.length + 20; k++) {
	        me.b ^= strseed.charCodeAt(k) | 0;
	        me.next();
	      }
	    }