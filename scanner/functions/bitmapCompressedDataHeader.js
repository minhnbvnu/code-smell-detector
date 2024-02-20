function bitmapCompressedDataHeader(opt) {
	var self = {
		cbCompFirstRowSize : new type.UInt16Le(0x0000, { constant : true }),
        // compressed data size
        cbCompMainBodySize : new type.UInt16Le(),
        cbScanWidth : new type.UInt16Le(),
        // uncompressed data size
        cbUncompressedSize : new type.UInt16Le()	
	};
	
	return new type.Component(self, opt);
}