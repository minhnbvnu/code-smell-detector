function _temporalRef(val, name) {
	  return val === _temporalUndefined ? _tdz(name) : val;
	}