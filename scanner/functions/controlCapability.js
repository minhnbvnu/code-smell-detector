function controlCapability(opt) {
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_CONTROL,
		controlFlags : new type.UInt16Le(),
		remoteDetachFlag : new type.UInt16Le(),
		controlInterest : new type.UInt16Le(0x0002),
		detachInterest : new type.UInt16Le(0x0002)
	};
	
	return new type.Component(self, opt);
}