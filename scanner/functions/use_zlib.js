function use_zlib(zlib) { try {
	var InflateRaw = zlib.InflateRaw;
	var InflRaw = new InflateRaw();
	InflRaw._processChunk(new Uint8Array([3, 0]), InflRaw._finishFlushFlag);
	if(InflRaw.bytesRead) _zlib = zlib;
	else throw new Error("zlib does not expose bytesRead");
} catch(e) {console.error("cannot use native zlib: " + (e.message || e)); } }