function fontCapability(opt) {
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_FONT,
		fontSupportFlags : new type.UInt16Le(0x0001),
		pad2octets : new type.UInt16Le()
	};
	
	return new type.Component(self, opt);
}