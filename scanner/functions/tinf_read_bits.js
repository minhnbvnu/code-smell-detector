function tinf_read_bits(d, num, base) {
	  if (!num)
	    { return base; }

	  while (d.bitcount < 24) {
	    d.tag |= d.source[d.sourceIndex++] << d.bitcount;
	    d.bitcount += 8;
	  }

	  var val = d.tag & (0xffff >>> (16 - num));
	  d.tag >>>= num;
	  d.bitcount -= num;
	  return val + base;
	}