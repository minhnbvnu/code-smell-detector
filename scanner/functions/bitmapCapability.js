function bitmapCapability(opt) {
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_BITMAP,
		preferredBitsPerPixel : new type.UInt16Le(),
        receive1BitPerPixel : new type.UInt16Le(0x0001),
        receive4BitsPerPixel : new type.UInt16Le(0x0001),
        receive8BitsPerPixel : new type.UInt16Le(0x0001),
        desktopWidth : new type.UInt16Le(),
        desktopHeight : new type.UInt16Le(),
        pad2octets : new type.UInt16Le(),
        desktopResizeFlag : new type.UInt16Le(),
        bitmapCompressionFlag : new type.UInt16Le(0x0001, {constant : true}),
        highColorFlags : new type.UInt8(0),
        drawingFlags : new type.UInt8(),
        multipleRectangleSupport : new type.UInt16Le(0x0001, {constant : true}),
        pad2octetsB : new type.UInt16Le()
	};
	
	return new type.Component(self, opt);
}