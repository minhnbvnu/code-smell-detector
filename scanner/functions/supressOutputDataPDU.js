function supressOutputDataPDU(opt) {
	var self = {
		__PDUTYPE2__ : PDUType2.PDUTYPE2_SUPPRESS_OUTPUT,
		allowDisplayUpdates : new type.UInt8(),
        pad3Octets : new type.Component([new type.UInt8(), new type.UInt8(), new type.UInt8()]),
        desktopRect : inclusiveRectangle({ conditional : function() {
        	return self.allowDisplayUpdates.value === Display.ALLOW_DISPLAY_UPDATES;
        } })
	};
	
	return new type.Component(self, opt);
}