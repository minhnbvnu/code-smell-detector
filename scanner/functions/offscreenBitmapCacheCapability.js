function offscreenBitmapCacheCapability(opt) {
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_OFFSCREENCACHE,
		offscreenSupportLevel : new type.UInt32Le(OffscreenSupportLevel.FALSE),
        offscreenCacheSize : new type.UInt16Le(),
        offscreenCacheEntries : new type.UInt16Le()
	};
	
	return new type.Component(self, opt);
}