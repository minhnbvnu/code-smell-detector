function persistentListPDU(entries, opt) {
	var self = {
		__PDUTYPE2__ : PDUType2.PDUTYPE2_BITMAPCACHE_PERSISTENT_LIST,
		numEntriesCache0 : new type.UInt16Le(),
        numEntriesCache1 : new type.UInt16Le(),
        numEntriesCache2 : new type.UInt16Le(),
        numEntriesCache3 : new type.UInt16Le(),
        numEntriesCache4 : new type.UInt16Le(),
        totalEntriesCache0 : new type.UInt16Le(),
        totalEntriesCache1 : new type.UInt16Le(),
        totalEntriesCache2 : new type.UInt16Le(),
        totalEntriesCache3 : new type.UInt16Le(),
        totalEntriesCache4 : new type.UInt16Le(),
        bitMask : new type.UInt8(),
        pad2 : new type.UInt8(),
        pad3 : new type.UInt16Le(),
        entries : entries || new type.Factory(function(s) {
        	var numEntries = self.numEntriesCache0.value + self.numEntriesCache1.value + self.numEntriesCache2.value + self.numEntriesCache3.value + self.numEntriesCache4.value;
        	self.entries = new type.Component([]);
        	for(var i = 0; i < numEntries; i++) {
        		self.entries.obj.push(persistentListEntry().read(s));
        	}
        })
	};
	
	return new type.Component(self, opt);
}