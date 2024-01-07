function seedrandom(seed, options, callback) {
	      var key = [];
	      options = options == true ? {
	        entropy: true
	      } : options || {}; // Flatten the seed string or build one from local entropy if needed.

	      var shortseed = mixkey(flatten(options.entropy ? [seed, tostring(pool)] : seed == null ? autoseed() : seed, 3), key); // Use the seed to initialize an ARC4 generator.

	      var arc4 = new ARC4(key); // This function returns a random double in [0, 1) that contains
	      // randomness in every bit of the mantissa of the IEEE 754 value.

	      var prng = function prng() {
	        var n = arc4.g(chunks),
	            // Start with a numerator n < 2 ^ 48
	        d = startdenom,
	            //   and denominator d = 2 ^ 48.
	        x = 0; //   and no 'extra last byte'.

	        while (n < significance) {
	          // Fill up all significant digits by
	          n = (n + x) * width; //   shifting numerator and

	          d *= width; //   denominator and generating a

	          x = arc4.g(1); //   new least-significant-byte.
	        }

	        while (n >= overflow) {
	          // To avoid rounding up, before adding
	          n /= 2; //   last byte, shift everything

	          d /= 2; //   right using integer math until

	          x >>>= 1; //   we have exactly the desired bits.
	        }

	        return (n + x) / d; // Form the number within [0, 1).
	      };

	      prng.int32 = function () {
	        return arc4.g(4) | 0;
	      };

	      prng.quick = function () {
	        return arc4.g(4) / 0x100000000;
	      };

	      prng.double = prng; // Mix the randomness into accumulated entropy.

	      mixkey(tostring(arc4.S), pool); // Calling convention: what to return as a function of prng, seed, is_math.

	      return (options.pass || callback || function (prng, seed, is_math_call, state) {
	        if (state) {
	          // Load the arc4 state from the given state if it has an S array.
	          if (state.S) {
	            copy(state, arc4);
	          } // Only provide the .state method if requested via options.state.


	          prng.state = function () {
	            return copy(arc4, {});
	          };
	        } // If called as a method of Math (Math.seedrandom()), mutate
	        // Math.random because that is how seedrandom.js has worked since v1.0.


	        if (is_math_call) {
	          math[rngname] = prng;
	          return seed;
	        } // Otherwise, it is a newer calling convention, so return the
	        // prng directly.
	        else return prng;
	      })(prng, shortseed, 'global' in options ? options.global : this == math, options.state);
	    }