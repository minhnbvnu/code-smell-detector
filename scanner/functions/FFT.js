function fft(re, im, inv) {
		var d, h, ik, m, tmp, wr, wi, xr, xi,
			n4 = _n >> 2;
		// bit reversal
		for(var l=0; l<_n; l++) {
			m = _bitrev[l];
			if(l < m) {
				tmp = re[l];
				re[l] = re[m];
				re[m] = tmp;
				tmp = im[l];
				im[l] = im[m];
				im[m] = tmp;
			}
		}
		// butterfly operation
		//butfly(re,im,inv,n4);
		for(var k=1; k<_n; k<<=1) {
			h = 0;
			d = _n/(k << 1);
			for(var j=0; j<k; j++) {
				wr = _cstb[h + n4];
				wi = inv*_cstb[h];
				for(var i=j; i<_n; i+=(k<<1)) {
					ik = i + k;
					xr = wr*re[ik] + wi*im[ik];
					xi = wr*im[ik] - wi*re[ik];
					re[ik] = re[i] - xr;
					re[i] += xr;
					im[ik] = im[i] - xi;
					im[i] += xi;
				}
				h += d;
			}
		}
	}