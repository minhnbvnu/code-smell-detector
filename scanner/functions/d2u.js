function d2u (d) {
	if (!_dview) _dview = new DataView(new ArrayBuffer(8));
	_dview.setFloat64(0, d, true);
	return [_dview.getUint32(0, true), _dview.getUint32(4, true)];
}