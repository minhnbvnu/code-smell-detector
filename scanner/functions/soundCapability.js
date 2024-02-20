function soundCapability(opt) {
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_SOUND,
		soundFlags : new type.UInt16Le(SoundFlag.NONE),
	    pad2octetsA : new type.UInt16Le()
	};
	
	return new type.Component(self, opt);
}