function _deflateRawSync(payload) {
	return _zlib ? _zlib.deflateRawSync(payload) : _deflate(payload);
}