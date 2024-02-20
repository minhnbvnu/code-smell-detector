function clientCoreData(opt) {
	var self = {
		__TYPE__ : MessageType.CS_CORE,
		rdpVersion : new type.UInt32Le(VERSION.RDP_VERSION_5_PLUS),
		desktopWidth : new type.UInt16Le(1280),
		desktopHeight : new type.UInt16Le(800),
		colorDepth : new type.UInt16Le(ColorDepth.RNS_UD_COLOR_8BPP),
		sasSequence : new type.UInt16Le(Sequence.RNS_UD_SAS_DEL),
		kbdLayout : new type.UInt32Le(KeyboardLayout.FRENCH),
		clientBuild : new type.UInt32Le(3790),
		clientName : new type.BinaryString(new Buffer('node-rdpjs\x00\x00\x00\x00\x00\x00', 'ucs2'), { readLength : new type.CallableValue(32) }),
		keyboardType : new type.UInt32Le(KeyboardType.IBM_101_102_KEYS),
		keyboardSubType : new type.UInt32Le(0),
		keyboardFnKeys : new type.UInt32Le(12),
		imeFileName : new type.BinaryString(new Buffer(Array(64 + 1).join('\x00')), { readLength : new type.CallableValue(64), optional : true }),
		postBeta2ColorDepth : new type.UInt16Le(ColorDepth.RNS_UD_COLOR_8BPP, { optional : true }),
		clientProductId : new type.UInt16Le(1, { optional : true }),
		serialNumber : new type.UInt32Le(0, { optional : true }),
		highColorDepth : new type.UInt16Le(HighColor.HIGH_COLOR_24BPP, { optional : true }),
		supportedColorDepths : new type.UInt16Le(Support.RNS_UD_15BPP_SUPPORT | Support.RNS_UD_16BPP_SUPPORT | Support.RNS_UD_24BPP_SUPPORT | Support.RNS_UD_32BPP_SUPPORT, { optional : true }),
		earlyCapabilityFlags : new type.UInt16Le(CapabilityFlag.RNS_UD_CS_SUPPORT_ERRINFO_PDU, { optional : true }),
		clientDigProductId : new type.BinaryString(new Buffer(Array(64 + 1).join('\x00')), { optional : true, readLength : new type.CallableValue(64) }),
		connectionType : new type.UInt8(0, { optional : true }),
		pad1octet : new type.UInt8(0, { optional : true }),
		serverSelectedProtocol : new type.UInt32Le(0, { optional : true })
	};
	
	return new type.Component(self, opt);
}