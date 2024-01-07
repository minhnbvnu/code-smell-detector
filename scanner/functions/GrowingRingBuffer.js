function GrowingRingBuffer() {
	    return _RingBuffer.call(this, GrowingRingBuffer.INITIAL_CAPACITY) || this;
	  }