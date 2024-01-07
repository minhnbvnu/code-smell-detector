function _makeCosSinTable() {
		var n2 = _n >> 1,
			n4 = _n >> 2,
			n8 = _n >> 3,
			n2p4 = n2 + n4,
			t = Math.sin(Math.PI/_n),
			dc = 2*t*t,
			ds = Math.sqrt(dc*(2 - dc)),
			c = _cstb[n4] = 1,
			s = _cstb[0] = 0;
		t = 2*dc;
		for(var i=1; i<n8; i++) {
			c -= dc;
			dc += t*c;
			s += ds;
			ds -= t*s;
			_cstb[i] = s;
			_cstb[n4 - i] = c;
		}
		if(n8 !== 0) {
			_cstb[n8] = Math.sqrt(0.5);
		}
		for(var j=0; j<n4; j++) {
			_cstb[n2 - j]  = _cstb[j];
		}
		for(var k=0; k<n2p4; k++) {
			_cstb[k + n2] = -_cstb[k];
		}
	}