function inclusiveRectangle(opt) {
	var self = {
		left : new type.UInt16Le(),
        top : new type.UInt16Le(),
        right : new type.UInt16Le(),
        bottom : new type.UInt16Le()	
	};
	
	return new type.Component(self, opt);
}