function bitmapData(coord, opt) {
	coord = coord || {};
	var self = {
		destLeft : new type.UInt16Le(coord.destLeft),
        destTop : new type.UInt16Le(coord.destTop),
        destRight : new type.UInt16Le(coord.destRight),
        destBottom : new type.UInt16Le(coord.destBottom),
        width : new type.UInt16Le(coord.width),
        height : new type.UInt16Le(coord.height),
        bitsPerPixel : new type.UInt16Le(coord.bitsPerPixel),
        flags : new type.UInt16Le(),
        bitmapLength : new type.UInt16Le(function() {
        	return self.bitmapComprHdr.size() + self.bitmapDataStream.size();
        }),
        bitmapComprHdr : bitmapCompressedDataHeader( { conditional : function() {
        	return (self.flags.value & BitmapFlag.BITMAP_COMPRESSION) && !(self.flags.value & BitmapFlag.NO_BITMAP_COMPRESSION_HDR);
        } }),
        bitmapDataStream : new type.BinaryString(coord.data, { readLength : new type.CallableValue(function() {
        	if(!self.flags.value & BitmapFlag.BITMAP_COMPRESSION || (self.flags.value & BitmapFlag.NO_BITMAP_COMPRESSION_HDR)) {
        		return self.bitmapLength.value;
        	}
        	else {
        		return self.bitmapComprHdr.cbCompMainBodySize.value;
        	}
        }) })
	};
	
	return new type.Component(self, opt);
}