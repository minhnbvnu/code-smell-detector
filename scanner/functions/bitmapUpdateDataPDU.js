function bitmapUpdateDataPDU(data, opt) {
	var self = {
		__UPDATE_TYPE__ : UpdateType.UPDATETYPE_BITMAP,
		numberRectangles : new type.UInt16Le(function() {
			return self.rectangles.obj.length;
		}),
        rectangles : data || new type.Factory(function(s) {
        	self.rectangles = new type.Component([]);
        	for(var i = 0; i < self.numberRectangles.value; i++) {
        		self.rectangles.obj.push(bitmapData().read(s));
        	}
        })
	};
	
	return new type.Component(self, opt);
}