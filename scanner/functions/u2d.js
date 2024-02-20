function u2d (low, hi) {
	if (!_dview) _dview = new DataView(new ArrayBuffer(8));
	_dview.setUint32(0, low, true);
	_dview.setUint32(4, hi, true);
	return _dview.getFloat64(0, true);
}