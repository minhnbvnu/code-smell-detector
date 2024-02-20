function tinf_getbit(d) {
	  /* check if tag is empty */
	  if (!d.bitcount--) {
	    /* load next tag */
	    d.tag = d.source[d.sourceIndex++];
	    d.bitcount = 7;
	  }

	  /* shift bit out of tag */
	  var bit = d.tag & 1;
	  d.tag >>>= 1;

	  return bit;
	}