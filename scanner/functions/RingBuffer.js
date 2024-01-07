function RingBuffer(capacity) {
	    this.capacity = capacity; // Note we store the indices in the range 0 <= index < 2*capacity.
	    // This allows us to distinguish the full from the empty case.
	    // See https://www.snellman.net/blog/archive/2016-12-13-ring-buffers/

	    this.begin = 0; // inclusive

	    this.end = 0; // exclusive

	    if (capacity == null) {
	      throw new RangeError('Can\'t create a ring buffer of unknown capacity.');
	    }

	    if (capacity < 1) {
	      throw new RangeError('Can\'t create ring buffer of capacity < 1.');
	    }

	    this.data = new Array(capacity);
	    this.doubledCapacity = 2 * capacity;
	  }