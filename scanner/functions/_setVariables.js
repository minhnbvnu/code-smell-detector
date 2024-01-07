function _setVariables() {
		if(typeof Uint8Array !== 'undefined') {
			_bitrev = new Uint8Array(_n);
		} else {
			_bitrev = new Array(_n);
		}
		if(typeof Float64Array !== 'undefined') {
			_cstb = new Float64Array(_n*1.25);
			_tre = new Float64Array(_n);
			_tim = new Float64Array(_n);
		} else {
			_cstb = new Array(_n*1.25);
			_tre = new Array(_n);
			_tim = new Array(_n);
		}
	}