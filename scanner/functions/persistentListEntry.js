function persistentListEntry(opt) {
	var self = {
		key1 : new type.UInt32Le(),
        key2 : new type.UInt32Le()
	};
	
	return new type.Component(self, opt);
}