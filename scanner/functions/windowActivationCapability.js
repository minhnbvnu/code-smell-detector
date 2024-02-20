function windowActivationCapability(opt) {
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_ACTIVATION,
		helpKeyFlag : new type.UInt16Le(),
        helpKeyIndexFlag : new type.UInt16Le(),
        helpExtendedKeyFlag : new type.UInt16Le(),
        windowManagerKeyFlag : new type.UInt16Le()	
	};
	
	return new type.Component(self, opt);
}