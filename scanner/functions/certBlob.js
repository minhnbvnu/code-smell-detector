function certBlob() {
	var self = {
		cbCert : new type.UInt32Le(function() {
			return self.abCert.size();
		}),
        abCert : new type.BinaryString(null, { readLength : new type.CallableValue(function() {
        	return self.cbCert.value;
        }) })
	};
	
	return new type.Component(self);
}