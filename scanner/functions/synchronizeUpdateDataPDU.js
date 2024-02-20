function synchronizeUpdateDataPDU(opt) {
	var self = {
		pad2Octets : new type.UInt16Le()
	};
	
	return new type.Component(self, opt);
}