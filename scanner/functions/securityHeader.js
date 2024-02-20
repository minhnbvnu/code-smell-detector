function securityHeader() {
	var self = {
		securityFlag : new type.UInt16Le(),
		securityFlagHi : new type.UInt16Le()
	};
	
	return new type.Component(self);
}