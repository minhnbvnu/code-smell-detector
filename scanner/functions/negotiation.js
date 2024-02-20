function negotiation(opt) {
	var self = {
		type : new type.UInt8(),
		flag : new type.UInt8(),
		length : new type.UInt16Le(0x0008, { constant : true }),
		result : new type.UInt32Le()
	};
	return new type.Component(self, opt);
}