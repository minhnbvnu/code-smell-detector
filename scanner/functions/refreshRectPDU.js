function refreshRectPDU(rectangles, opt) {
	var self = {
		__PDUTYPE2__ : PDUType2.PDUTYPE2_REFRESH_RECT,
		numberOfAreas : UInt8(function() {
			return self.areasToRefresh.obj.length;
		}),
        pad3Octets : new type.Component([new type.UInt8(), new type.UInt8(), new type.UInt8()]),
        areasToRefresh : rectangles || new type.Factory(function(s) {
        	self.areasToRefresh = new type.Component([]);
        	for(var i = 0; i < self.numberOfAreas.value; i++) {
        		self.areasToRefresh.obj.push(inclusiveRectangle().read(s));
        	}
        })
	};
	
	return new type.Component(self, opt);
}