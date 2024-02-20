function multiFragmentUpdate(opt) {
	var self = {
		__TYPE__ : CapsType.CAPSETTYPE_MULTIFRAGMENTUPDATE,
		MaxRequestSize : new type.UInt32Le(0)
	};
	
	return new type.Component(self, opt);
}