function tinf_build_tree(t, lengths, off, num) {
	  var i, sum;

	  /* clear code length count table */
	  for (i = 0; i < 16; ++i) { t.table[i] = 0; }

	  /* scan symbol lengths, and sum code length counts */
	  for (i = 0; i < num; ++i) { t.table[lengths[off + i]]++; }

	  t.table[0] = 0;

	  /* compute offset table for distribution sort */
	  for (sum = 0, i = 0; i < 16; ++i) {
	    offs[i] = sum;
	    sum += t.table[i];
	  }

	  /* create code->symbol translation table (symbols sorted by code) */
	  for (i = 0; i < num; ++i) {
	    if (lengths[off + i]) { t.trans[offs[lengths[off + i]]++] = i; }
	  }
	}