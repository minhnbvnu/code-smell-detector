function channelDef (opt) {
	var self = {
		name : new type.BinaryString(null, { readLength : new type.CallableValue(8) }),
		options : new type.UInt32Le()
	};
	
	return new type.Component(self, opt);
}