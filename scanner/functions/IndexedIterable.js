function IndexedIterable(value) {
	      return isIndexed(value) ? value : IndexedSeq(value);
	    }