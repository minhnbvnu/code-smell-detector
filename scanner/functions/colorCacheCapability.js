function colorCacheCapability(opt) {
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_COLORCACHE,
		colorTableCacheSize : new type.UInt16Le(0x0006),
		pad2octets : new type.UInt16Le()
	};
	
	return new type.Component(self, opt);
}