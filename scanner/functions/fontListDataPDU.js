function fontListDataPDU(opt) {
	var self = {
		__PDUTYPE2__ : PDUType2.PDUTYPE2_FONTLIST,
		numberFonts : new type.UInt16Le(),
        totalNumFonts : new type.UInt16Le(),
        listFlags : new type.UInt16Le(0x0003),
        entrySize : new type.UInt16Le(0x0032)
	};
	
	return new type.Component(self, opt);
}