function fontMapDataPDU(opt) {
	var self = {
		__PDUTYPE2__ : PDUType2.PDUTYPE2_FONTMAP,
		numberEntries : new type.UInt16Le(),
        totalNumEntries : new type.UInt16Le(),
        mapFlags : new type.UInt16Le(0x0003),
        entrySize : new type.UInt16Le(0x0004)
	};
	
	return new type.Component(self, opt);
}