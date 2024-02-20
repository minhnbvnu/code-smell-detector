function fastPathBitmapUpdateDataPDU (opt) {
	var self = {
		__FASTPATH_UPDATE_TYPE__ : FastPathUpdateType.FASTPATH_UPDATETYPE_BITMAP,
		header : new type.UInt16Le(FastPathUpdateType.FASTPATH_UPDATETYPE_BITMAP, { constant : true }),
        numberRectangles : new type.UInt16Le( function () {
        	return self.rectangles.obj.length;
        }),
		rectangles : new type.Factory( function (s) {
			self.rectangles = new type.Component([]);
			for(var i = 0; i < self.numberRectangles.value; i++) {
				self.rectangles.obj.push(bitmapData().read(s));
			}
		})
	};
	
	return new type.Component(self, opt);
}