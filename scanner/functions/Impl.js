function impl(seed, opts) {
	      var xg = new XorGen(seed),
	          state = opts && opts.state,
	          prng = function prng() {
	        return (xg.next() >>> 0) / 0x100000000;
	      };

	      prng.double = function () {
	        do {
	          var top = xg.next() >>> 11,
	              bot = (xg.next() >>> 0) / 0x100000000,
	              result = (top + bot) / (1 << 21);
	        } while (result === 0);

	        return result;
	      };

	      prng.int32 = xg.next;
	      prng.quick = prng;

	      if (state) {
	        if (typeof state == 'object') copy(state, xg);

	        prng.state = function () {
	          return copy(xg, {});
	        };
	      }

	      return prng;
	    }