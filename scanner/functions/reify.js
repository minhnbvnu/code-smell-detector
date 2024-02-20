function reify(iter, seq) {
	    return isSeq(iter) ? seq : iter.constructor(seq);
	  }