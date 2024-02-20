function shareDataHeader(length, pduType2, shareId, opt) {
	var self = {
		shareId : new type.UInt32Le(shareId),
        pad1 : new type.UInt8(),
        streamId : new type.UInt8(StreamId.STREAM_LOW),
        uncompressedLength : new type.UInt16Le(function() {
        	return length.value - 8;
        }),
        pduType2 : new type.UInt8(pduType2),
        compressedType : new type.UInt8(),
        compressedLength : new type.UInt16Le()
	};
	
	return new type.Component(self, opt);
}