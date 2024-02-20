function bitmapCacheCapability(opt) {
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_BITMAPCACHE,
		pad1 : new type.UInt32Le(),
        pad2 : new type.UInt32Le(),
        pad3 : new type.UInt32Le(),
        pad4 : new type.UInt32Le(),
        pad5 : new type.UInt32Le(),
        pad6 : new type.UInt32Le(),
        cache0Entries : new type.UInt16Le(),
        cache0MaximumCellSize : new type.UInt16Le(),
        cache1Entries : new type.UInt16Le(),
        cache1MaximumCellSize : new type.UInt16Le(),
        cache2Entries : new type.UInt16Le(),
        cache2MaximumCellSize : new type.UInt16Le()
	};
	
	return new type.Component(self, opt);
}