function brushCapability(opt) {
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_BRUSH,
		brushSupportLevel : new type.UInt32Le(BrushSupport.BRUSH_DEFAULT)
	};
	
	return new type.Component(self, opt);
}