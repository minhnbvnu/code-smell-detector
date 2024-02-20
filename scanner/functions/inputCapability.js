function inputCapability(opt) {
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_INPUT,
		inputFlags : new type.UInt16Le(),
        pad2octetsA : new type.UInt16Le(),
        // same value as gcc.ClientCoreSettings.kbdLayout
        keyboardLayout : new type.UInt32Le(),
        // same value as gcc.ClientCoreSettings.keyboardType
        keyboardType : new type.UInt32Le(),
        // same value as gcc.ClientCoreSettings.keyboardSubType
        keyboardSubType : new type.UInt32Le(),
        // same value as gcc.ClientCoreSettings.keyboardFnKeys
        keyboardFunctionKey : new type.UInt32Le(),
        // same value as gcc.ClientCoreSettingrrs.imeFileName
        imeFileName : new type.BinaryString(new Buffer(Array(64 + 1).join('\x00'), 'binary'), {readLength : new type.CallableValue(64)})
	};
	
	return new type.Component(self, opt);
}