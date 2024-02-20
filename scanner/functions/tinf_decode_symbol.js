function tinf_decode_symbol(d, t) {
	  while (d.bitcount < 24) {
	    d.tag |= d.source[d.sourceIndex++] << d.bitcount;
	    d.bitcount += 8;
	  }
	  
	  var sum = 0, cur = 0, len = 0;
	  var tag = d.tag;

	  /* get more bits while code value is above sum */
	  do {
	    cur = 2 * cur + (tag & 1);
	    tag >>>= 1;
	    ++len;

	    sum += t.table[len];
	    cur -= t.table[len];
	  } while (cur >= 0);
	  
	  d.tag = tag;
	  d.bitcount -= len;

	  return t.trans[sum + cur];
	}