function tinf_build_bits_base(bits, base, delta, first) {
	  var i, sum;

	  /* build bits table */
	  for (i = 0; i < delta; ++i) { bits[i] = 0; }
	  for (i = 0; i < 30 - delta; ++i) { bits[i + delta] = i / delta | 0; }

	  /* build base table */
	  for (sum = first, i = 0; i < 30; ++i) {
	    base[i] = sum;
	    sum += 1 << bits[i];
	  }
	}