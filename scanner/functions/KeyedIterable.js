function KeyedIterable(value) {
	      return isKeyed(value) ? value : KeyedSeq(value);
	    }