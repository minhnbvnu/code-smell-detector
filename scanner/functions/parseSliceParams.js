function parseSliceParams(x, begin, size) {
	  // The following logic allows for more ergonomic calls.
	  var begin_;
	  var xRank = x.shape.length;

	  if (typeof begin === 'number') {
	    begin_ = [begin].concat(new Array(xRank - 1).fill(0));
	  } else if (begin.length < xRank) {
	    begin_ = begin.concat(new Array(xRank - begin.length).fill(0));
	  } else {
	    begin_ = begin.slice();
	  }

	  begin_.forEach(function (d) {
	    assert(d !== -1, function () {
	      return 'slice() does not support negative begin indexing.';
	    });
	  });
	  var size_;

	  if (size == null) {
	    size_ = new Array(xRank).fill(-1);
	  } else if (typeof size === 'number') {
	    size_ = [size].concat(new Array(xRank - 1).fill(-1));
	  } else if (size.length < xRank) {
	    size_ = size.concat(new Array(xRank - size.length).fill(-1));
	  } else {
	    size_ = size;
	  }

	  size_ = size_.map(function (d, i) {
	    if (d >= 0) {
	      return d;
	    } else {
	      assert(d === -1, function () {
	        return "Negative size values should be exactly -1 but got " + (d + " for the slice() size at index " + i + ".");
	      });
	      return x.shape[i] - begin_[i];
	    }
	  });
	  return [begin_, size_];
	}