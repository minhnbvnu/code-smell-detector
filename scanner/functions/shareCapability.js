function shareCapability(opt) {
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_SHARE,
		nodeId : new type.UInt16Le(),
		pad2octets : new type.UInt16Le()	
	};
	
	return new type.Component(self, opt);
}