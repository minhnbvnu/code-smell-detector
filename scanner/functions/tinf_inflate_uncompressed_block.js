function tinf_inflate_uncompressed_block(d) {
	  var length, invlength;
	  var i;
	  
	  /* unread from bitbuffer */
	  while (d.bitcount > 8) {
	    d.sourceIndex--;
	    d.bitcount -= 8;
	  }

	  /* get length */
	  length = d.source[d.sourceIndex + 1];
	  length = 256 * length + d.source[d.sourceIndex];

	  /* get one's complement of length */
	  invlength = d.source[d.sourceIndex + 3];
	  invlength = 256 * invlength + d.source[d.sourceIndex + 2];

	  /* check length */
	  if (length !== (~invlength & 0x0000ffff))
	    { return TINF_DATA_ERROR; }

	  d.sourceIndex += 4;

	  /* copy block */
	  for (i = length; i; --i)
	    { d.dest[d.destLen++] = d.source[d.sourceIndex++]; }

	  /* make sure we start next block on a byte boundary */
	  d.bitcount = 0;

	  return TINF_OK;
	}