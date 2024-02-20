function cacheEntry(opt) {
	var self = {
		cacheEntries : new type.UInt16Le(),
        cacheMaximumCellSize : new type.UInt16Le()	
	};
	
	return new type.Component(self, opt);
}