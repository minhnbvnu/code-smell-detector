function generalCapability(opt) {
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_GENERAL,
		osMajorType : new type.UInt16Le(),
        osMinorType : new type.UInt16Le(),
        protocolVersion : new type.UInt16Le(0x0200, {constant : true}),
        pad2octetsA : new type.UInt16Le(),
        generalCompressionTypes : new type.UInt16Le(0, {constant : true}),
        extraFlags : new type.UInt16Le(),
        updateCapabilityFlag : new type.UInt16Le(0, {constant : true}),
        remoteUnshareFlag : new type.UInt16Le(0, {constant : true}),
        generalCompressionLevel : new type.UInt16Le(0, {constant : true}),
        refreshRectSupport : new type.UInt8(),
        suppressOutputSupport : new type.UInt8()
	};
	
	return new type.Component(self, opt);
}