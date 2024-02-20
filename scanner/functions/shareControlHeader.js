function shareControlHeader(length, pduType, userId, opt) {
	var self = {
		totalLength : new type.UInt16Le(length),
        pduType : new type.UInt16Le(pduType),
        // for xp sp3 and deactiveallpdu PDUSource may not be present
        PDUSource : new type.UInt16Le(userId, { optional : true })
	};
	
	return new type.Component(self, opt);
}