function serverCoreData(opt) {
	var self = {
		__TYPE__ : MessageType.SC_CORE,
		rdpVersion : new type.UInt32Le(VERSION.RDP_VERSION_5_PLUS),
		clientRequestedProtocol : new type.UInt32Le(null, { optional : true }),
		earlyCapabilityFlags : new type.UInt32Le(null, { optional : true })	
	};
	
	return new type.Component(self, opt);
}