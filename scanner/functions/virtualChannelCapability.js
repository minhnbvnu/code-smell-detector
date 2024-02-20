function virtualChannelCapability(opt) {
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_VIRTUALCHANNEL,
		flags : new type.UInt32Le(VirtualChannelCompressionFlag.VCCAPS_NO_COMPR),
        VCChunkSize : new type.UInt32Le(null, {optional : true})	
	};
	
	return new type.Component(self, opt);
}