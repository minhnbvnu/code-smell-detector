function _makeBitReversal() {
		var i = 0,
			j = 0,
			k = 0;
		_bitrev[0] = 0;
		while(++i < _n) {
			k = _n >> 1;
			while(k <= j) {
				j -= k;
				k >>= 1;
			}
			j += k;
			_bitrev[i] = j;
		}
	}